"""Falla si aparece cualquier llamada de escritura (POST/PUT/DELETE/PATCH) hacia Cloudbeds."""
import ast
import re
from pathlib import Path

SRC = Path(__file__).parent.parent / "amae21"
WRITE = {"POST", "PUT", "DELETE", "PATCH"}
WRITE_FUNCS = {"post", "put", "delete", "patch"}


def test_no_write_http_methods_in_source():
    for py in SRC.rglob("*.py"):
        tree = ast.parse(py.read_text(encoding="utf-8"))
        for node in ast.walk(tree):
            if isinstance(node, ast.Constant) and isinstance(node.value, str):
                assert node.value.upper() not in WRITE, f"{py.name}:{node.lineno} método {node.value}"
            if isinstance(node, ast.keyword) and node.arg == "data":
                raise AssertionError(f"{py.name}:{node.lineno} envía cuerpo (data=) a una URL")
            if isinstance(node, ast.Attribute) and node.attr in WRITE_FUNCS:
                raise AssertionError(f"{py.name}:{node.lineno} llamada .{node.attr}()")


def test_no_write_verbs_in_cloudbeds_endpoints():
    text = (SRC / "cloudbeds.py").read_text(encoding="utf-8")
    assert not re.search(r"\b(post|put|delete|patch)[A-Z]\w*", text), "endpoint de escritura (postX/putX/deleteX)"


def test_client_only_exposes_get():
    from amae21.cloudbeds import CloudbedsReadOnlyClient
    public = {n for n in dir(CloudbedsReadOnlyClient) if not n.startswith("_")}
    assert public == {"get"}
