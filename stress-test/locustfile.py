from locust import HttpUser, TaskSet, task, between
from dotenv import load_dotenv
import os

load_dotenv()

TOKEN = os.getenv("TOKEN")


class WebsiteTasks(TaskSet):
    @task
    def test_mfazrinizar(self):
        self.client.get("/login", verify=False)  # Test mfazrinizar.com root endpoint

class ApiTasks(TaskSet):
    @task
    def test_api(self):
        headers = {"Authorization": f"Bearer {TOKEN}"}
        self.client.get("/api/v1/users", headers=headers, verify=False)  # Test api.mfazrinizar.com endpoint

# class DbTasks(TaskSet):
#     @task
#     def test_db(self):
#         self.client.get("/", verify=False)  # Test db.mfazrinizar.com DBMS UI

class TestWebsite(HttpUser):
    tasks = [WebsiteTasks]
    wait_time = between(1, 10)
    host = "https://mfazrinizar.com"

class TestApi(HttpUser):
    tasks = [ApiTasks]
    wait_time = between(1, 10)
    host = "https://api.mfazrinizar.com"

# class TestDb(HttpUser):
#     tasks = [DbTasks]
#     wait_time = between(1, 2)
#     host = "https://db.mfazrinizar.com"
