from flask import Flask, request, jsonify
from flask_cors import CORS
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Google Sheets configuration
GOOGLE_SHEETS_CREDENTIALS = 'path/to/your/credentials.json'  # Replace with your credentials file path
SPREADSHEET_ID = 'your-spreadsheet-id'  # Replace with your Google Sheet ID
WORKSHEET_NAME = 'Contact Messages'

def save_to_google_sheets(name, email, message):
    """Save contact form data to Google Sheets"""
    try:
        # Set up credentials
        scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
        credentials = ServiceAccountCredentials.from_json_keyfile_name(GOOGLE_SHEETS_CREDENTIALS, scope)
        client = gspread.authorize(credentials)

        # Open the spreadsheet
        sheet = client.open_by_key(SPREADSHEET_ID).worksheet(WORKSHEET_NAME)

        # Prepare data
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        row_data = [timestamp, name, email, message]

        # Append to sheet
        sheet.append_row(row_data)

        return True
    except Exception as e:
        print(f"Google Sheets save failed: {e}")
        return False

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if field not in data or not data[field].strip():
                return jsonify({'error': f'{field} is required'}), 400

        name = data['name'].strip()
        email = data['email'].strip()
        message = data['message'].strip()

        # Basic email validation
        if '@' not in email or '.' not in email:
            return jsonify({'error': 'Invalid email address'}), 400

        # Save to Google Sheets
        sheets_saved = save_to_google_sheets(name, email, message)

        if sheets_saved:
            return jsonify({'message': 'Message sent successfully'}), 200
        else:
            return jsonify({'error': 'Failed to save message, but request received'}), 200

    except Exception as e:
        print(f"Error processing contact form: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)