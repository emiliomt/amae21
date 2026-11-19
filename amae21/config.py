from __future__ import annotations

import tomllib
from dataclasses import dataclass
from decimal import Decimal
from pathlib import Path


@dataclass(frozen=True)
class Settings:
    channel_cap: Decimal
    floors: dict[str, Decimal]
    ceilings: dict[str, Decimal]


def load_settings(path: str | Path = "config/settings.toml") -> Settings:
    data = tomllib.loads(Path(path).read_text(encoding="utf-8"))
    rooms = data["tipos_de_cuarto"]
    return Settings(
        channel_cap=Decimal(str(data["descuentos"]["tope_por_canal"])),
        floors={k: Decimal(str(v["piso"])) for k, v in rooms.items()},
        ceilings={k: Decimal(str(v["techo"])) for k, v in rooms.items()},
    )
