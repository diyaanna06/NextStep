from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)

password = "password123"

hashed = hash_password(password)

print("Hashed Password:")
print(hashed)

print("\nPassword Verification:")
print(
    verify_password(
        password,
        hashed
    )
)

token = create_access_token(
    {"sub": "1"}
)

print("\nJWT Token:")
print(token)