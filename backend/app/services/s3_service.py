from app.core.config import (
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_S3_BUCKET_NAME
)

import boto3
from botocore.config import Config

s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION,
    endpoint_url=f"https://s3.{AWS_REGION}.amazonaws.com",
    config=Config(
        signature_version="s3v4"
    )
)


def upload_resume(
    file,
    user_id: int
) -> str:
    """
    Upload resume to S3 and return object key.
    """

    object_key = (
        f"resumes/{user_id}/resume.pdf"
    )

    s3_client.upload_fileobj(
        file,
        AWS_S3_BUCKET_NAME,
        object_key,
        ExtraArgs={
            "ContentType": "application/pdf"
        }
    )

    return object_key


def delete_resume(
    object_key: str
) -> None:
    """
    Delete resume from S3.
    """

    s3_client.delete_object(
        Bucket=AWS_S3_BUCKET_NAME,
        Key=object_key
    )


def generate_presigned_url(
    object_key: str
) -> str:
    """
    Generate temporary URL.
    """

    return s3_client.generate_presigned_url(
    ClientMethod="get_object",
    Params={
        "Bucket": AWS_S3_BUCKET_NAME,
        "Key": object_key
    },
    ExpiresIn=300,
    HttpMethod="GET"
)