from pydantic import BaseModel


class AskRequest(BaseModel):
    question: str
    language: str = "English"
    document_id: str
    
class SummarizeRequest(BaseModel):
    document_id: str
    language: str = "English"