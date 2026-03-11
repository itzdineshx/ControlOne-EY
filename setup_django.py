#!/usr/bin/env python3
"""Run Django setup: makemigrations, migrate, seed_data."""
import subprocess
import sys
import os

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backend'))

commands = [
    [sys.executable, 'manage.py', 'makemigrations', 'api'],
    [sys.executable, 'manage.py', 'migrate'],
    [sys.executable, 'manage.py', 'seed_data'],
]

for cmd in commands:
    print(f"\n>>> Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    print(result.stdout)
    if result.stderr:
        print(result.stderr)
    if result.returncode != 0:
        print(f"FAILED with exit code {result.returncode}")
        sys.exit(result.returncode)

print("\n✓ All Django setup commands completed successfully!")
