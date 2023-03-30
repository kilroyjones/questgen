from backend.api import api
from flask import request

@api.route('/submit-file', methods=['GET', 'POST'])
def submit_file():
    file = request.files
    print(file)