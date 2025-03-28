from typing import Dict

# Base URL for the social media platform API
BASE_URL = "http://20.244.56.144/test"

# Authentication token
AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTQ5MjgxLCJpYXQiOjE3NDMxNDg5ODEsImlzcyI6IkFmZm9ybWVkIiwianRpIjoiOWZiOGNlMTMtZTMwNi00Mzc2LWFmZGItOGEwNzgzOWM3NTVkIiwic3ViIjoic2FicmlzaHYxMUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjlmYjhjZTEzLWUzMDYtNDM3Ni1hZmRiLThhMDc4MzljNzU1ZCIsImNsaWVudFNlY3JldCI6ImNYQ01GZFpmUll1UG9ReXAiLCJvd25lck5hbWUiOiJSYWh1bCIsIm93bmVyRW1haWwiOiJzYWJyaXNodjExQGdtYWlsLmNvbSIsInJvbGxObyI6IjcxMzUyMklUMDQ4In0.Xxa0WaafoED9Po7xXM2ilZwYzhibjAnZKcvjg-84elM"

# Cache settings (in seconds)
CACHE_TTL = 60  # Cache time to live

# API endpoints
ENDPOINTS = {
    "users": f"{BASE_URL}/users",
    "user_posts": f"{BASE_URL}/users/{{user_id}}/posts",
    "post_comments": f"{BASE_URL}/posts/{{post_id}}/comments"
}

# Response models
class User(Dict):
    id: str
    name: str

class Post(Dict):
    id: int
    userid: int
    content: str

class Comment(Dict):
    id: int
    postid: int
    content: str 