from pydantic import BaseModel


class AskRequest(BaseModel):
    question: str
    language: str = "English"
    document_id: str