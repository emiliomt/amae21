"""Regla del tope de descuento por canal.

Descuento efectivo = 1 - (1-d1)(1-d2)...  (descuentos apilados, no sumados).
El tope viene de la configuración; este módulo no tiene forma de cambiarlo.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date
from decimal import Decimal
from itertools import combinations

ONE = Decimal(1)


@dataclass(frozen=True)
class Campaign:
    channel: str
    name: str
    pct: Decimal  # fracción, 0.10 = 10%
    start: date | None = None
    end: date | None = None

    def active_on(self, d: date) -> bool:
        return (self.start is None or self.start <= d) and (self.end is None or d <= self.end)


@dataclass(frozen=True)
class CapResult:
    channel: str
    ok: bool
    effective: Decimal
    cap: Decimal
    remove: tuple[str, ...] = field(default_factory=tuple)  # campañas a quitar
    message: str = ""


def effective_discount(discounts: list[Decimal]) -> Decimal:
    keep = ONE
    for d in discounts:
        keep *= ONE - d
    return ONE - keep


def rate_discount(suggested: Decimal, list_rate: Decimal) -> Decimal:
    """Descuento implícito de la tarifa sugerida contra la tarifa de lista (0 si no es menor)."""
    if list_rate <= 0:
        raise ValueError("la tarifa de lista debe ser positiva")
    return max(Decimal(0), ONE - suggested / list_rate)


def check_channel(channel: str, suggested: Decimal, list_rate: Decimal,
                  campaigns: list[Campaign], on: date, cap: Decimal) -> CapResult:
    active = [c for c in campaigns if c.channel == channel and c.active_on(on)]
    base = rate_discount(suggested, list_rate)
    eff = effective_discount([base] + [c.pct for c in active])
    if eff <= cap:
        return CapResult(channel, True, eff, cap)

    # Con todas las campañas fuera, ¿la tarifa sola ya pasa el tope?
    if base > cap:
        return CapResult(channel, False, eff, cap, (),
                         f"{channel}: la tarifa sugerida sola ya da {base:.1%} de descuento "
                         f"(tope {cap:.0%}); quitar campañas no lo arregla. No se sugiere.")
    # Menor número de campañas a quitar; a igual número, las que menos descuento quitan.
    best: tuple[str, ...] | None = None
    for n in range(1, len(active) + 1):
        fits = []
        for combo in combinations(active, n):
            rest = [c for c in active if c not in combo]
            if effective_discount([base] + [c.pct for c in rest]) <= cap:
                fits.append((sum(c.pct for c in combo), tuple(c.name for c in combo)))
        if fits:
            best = min(fits)[1]
            break
    assert best is not None  # quitando todas queda base <= cap
    return CapResult(channel, False, eff, cap, best,
                     f"{channel}: descuento efectivo {eff:.1%} supera el tope de {cap:.0%}. "
                     f"Quitar campaña: {', '.join(best)}.")


def check_all_channels(channels: list[str], suggested: Decimal, list_rate: Decimal,
                       campaigns: list[Campaign], on: date, cap: Decimal) -> list[CapResult]:
    return [check_channel(ch, suggested, list_rate, campaigns, on, cap) for ch in channels]
