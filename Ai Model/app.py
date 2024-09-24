from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model_lifetime = joblib.load('models/model_lifetime.pkl')
model_compliant = joblib.load('models/model_compliant.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        voltage = data.get('Voltage')
        temperature = data.get('Temperature')
        humidity = data.get('Humidity')
        
        if None in [voltage, temperature, humidity]:
            return jsonify({'error': 'Missing input data'}), 400

        features = np.array([[voltage,temperature, humidity]])
        
        predicted_lifetime = model_lifetime.predict(features)[0]
        predicted_compliant = model_compliant.predict(features)[0]
        
        return jsonify({
            'Predicted Expected Lifetime': predicted_lifetime,
            'IEC 62133-2:2017 Compliant': bool(predicted_compliant)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


# Command 

## curl -X POST http://127.0.0.1:5000/predict -H "Content-Type: application/json" -d "{\"Voltage\": 3.7, \"Temperature\": 25, \"Humidity\": 50}"
