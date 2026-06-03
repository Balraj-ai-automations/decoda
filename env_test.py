import os
from dotenv import load_dotenv, dotenv_values

print("FILE CHECK:")
print(dotenv_values(".env"))

load_dotenv(".env")

print("\nENV CHECK:")
print("MISTRAL:", os.getenv("MISTRAL_API_KEY"))
print("LANGCHAIN:", os.getenv("LANGCHAIN_API_KEY"))
print("TRACING:", os.getenv("LANGCHAIN_TRACING_V2"))