from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str


class UploadResponse(BaseModel):
    message: str
    document_id: str


class SourceResponse(BaseModel):
    document_id: str
    page: int

class AskResponse(BaseModel):
    answer: str
    sources: list[SourceResponse]


class SummarizeResponse(BaseModel):
    summary: str