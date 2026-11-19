from datetime import date
from decimal import Decimal as D

from amae21.discount_cap import Campaign, check_channel, effective_discount

DAY = date(2026, 12, 5)
CAP = D("0.15")


def test_stacking_is_multiplicative_not_additive():
    assert effective_discount([D("0.10"), D("0.10")]) == D("0.19")  # no 0.20


def test_exactly_at_cap_is_allowed():
    # 1 - 0.85 = 0.15 exacto
    r = check_channel("Booking.com", D("1700"), D("2000"), [], DAY, CAP)
    assert r.ok and r.effective == D("0.15")


def test_over_cap_blocks_and_names_campaign():
    camps = [Campaign("Booking.com", "Genius", D("0.10")),
             Campaign("Booking.com", "Early Booker", D("0.08"))]
    r = check_channel("Booking.com", D("1900"), D("2000"), camps, DAY, CAP)  # 5% + 10% + 8%
    assert not r.ok
    assert r.remove == ("Early Booker",)  # la de menor descuento que arregla
    assert "Quitar campaña" in r.message


def test_prefers_removing_smallest_fix():
    camps = [Campaign("X", "Grande", D("0.10")), Campaign("X", "Chica", D("0.05"))]
    # 5% + 10% + 5% = 18.7%. Quitar Chica -> 14.5% (basta); se prefiere quitar lo menos posible.
    r = check_channel("X", D("1900"), D("2000"), camps, DAY, CAP)
    assert r.remove == ("Chica",)


def test_rate_alone_over_cap_cannot_be_fixed_by_campaigns():
    r = check_channel("X", D("1500"), D("2000"), [Campaign("X", "C", D("0.05"))], DAY, CAP)
    assert not r.ok and r.remove == ()


def test_inactive_and_other_channel_campaigns_ignored():
    camps = [Campaign("X", "Vencida", D("0.10"), end=date(2026, 1, 1)),
             Campaign("Otro", "Otra", D("0.10"))]
    assert check_channel("X", D("1900"), D("2000"), camps, DAY, CAP).ok
