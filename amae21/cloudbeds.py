"""Lectura de Cloudbeds. SOLO LECTURA: este módulo únicamente hace GET.

Respaldo: CSV semanal exportado a mano (ver data/samples/).
Nota: rutas y campos de la API v1.2 por verificar contra la credencial real
(getReservations, getRatePlans, getAvailableRoomTypes).
"""
from __future__ import annotations

import csv
import json
import os
import urllib.parse
import urllib.request
from decimal import Decimal
from pathlib import Path

BASE_URL = "https://api.cloudbeds.com/api/v1.2"
ROOM_TYPES = ("Deluxe King", "Deluxe Doble", "Master Suite", "Family Room")


class CloudbedsReadOnlyClient:
    def __init__(self, token: str | None = None, base_url: str = BASE_URL):
        self._token = token or os.environ["CLOUDBEDS_API_KEY"]  # credencial con permisos de lectura
        self._base = base_url.rstrip("/")

    def get(self, endpoint: str, **params) -> dict:
        url = f"{self._base}/{endpoint}?{urllib.parse.urlencode(params)}"
        req = urllib.request.Request(url, method="GET",
                                     headers={"Authorization": f"Bearer {self._token}"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.load(resp)


def load_rates_csv(path: str | Path) -> list[dict]:
    """CSV: fecha,tipo_cuarto,canal,tarifa_lista,tarifa_cerrada"""
    rows = []
    with open(path, newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            if r["tipo_cuarto"] not in ROOM_TYPES:
                raise ValueError(f"tipo de cuarto desconocido: {r['tipo_cuarto']!r}")
            rows.append({**r, "tarifa_lista": Decimal(r["tarifa_lista"]),
                         "tarifa_cerrada": Decimal(r["tarifa_cerrada"])})
    return rows


def load_campaigns_csv(path: str | Path):
    """CSV: canal,nombre,porcentaje,desde,hasta  (porcentaje 10 = 10%)."""
    from datetime import date
    from .discount_cap import Campaign
    out = []
    with open(path, newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            out.append(Campaign(r["canal"], r["nombre"], Decimal(r["porcentaje"]) / 100,
                                date.fromisoformat(r["desde"]) if r["desde"] else None,
                                date.fromisoformat(r["hasta"]) if r["hasta"] else None))
    return out
