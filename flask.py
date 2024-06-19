# -*- coding: utf-8 -*-

import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from fuzzywuzzy import fuzz

app = Flask(__name__)

file_path = 'jobss.csv'
jobs_data = pd.read_csv(file_path)

jobs_data.dropna(subset=['Job Title'], inplace=True)
tfidf = TfidfVectorizer()

X = tfidf.fit_transform(jobs_data['Key Skills'].astype(str))

y_title = jobs_data['Job Title']
model_title = RandomForestClassifier(random_state=40)
model_title.fit(X, y_title)

y_location = jobs_data['Location']
model_location = RandomForestClassifier(random_state=42)
model_location.fit(X, y_location)

def predict_job_title_and_location(skills, top_n=5, relevance_threshold=0.08):
    skills_transformed = tfidf.transform([skills.lower()])

    probs_title = model_title.predict_proba(skills_transformed)[0]
    top_n_indices_title = np.argsort(probs_title)[-top_n:]
    top_n_probs_title = probs_title[top_n_indices_title]
    relevant_titles = [model_title.classes_[i] for i, prob in zip(top_n_indices_title, top_n_probs_title) if prob >= relevance_threshold]

    predicted_title = np.random.choice(relevant_titles) if relevant_titles else 'No relevant title found'

    probs_location = model_location.predict_proba(skills_transformed)[0]
    top_n_indices_location = np.argsort(probs_location)[-top_n:]
    predicted_location = np.random.choice([model_location.classes_[i] for i in top_n_indices_location])

    return predicted_title, predicted_location

def find_most_similar_jobs(predicted_title, predicted_location, jobs, similarity_threshold=50):
    matched_job_ids = []

    for job in jobs:
        score_title = fuzz.token_sort_ratio(job['title'].lower(), predicted_title.lower())
        score_location = fuzz.token_sort_ratio(job['location'].lower(), predicted_location.lower())

        if score_title >= similarity_threshold or score_location >= similarity_threshold:
            matched_job_ids.append(job['id'])

    return matched_job_ids

@app.route('/predict', methods=['POST'])
def predict_title():
    data = request.json
    skills = ' '.join(skill["name"].lower() for skill in data["profile"]["skills"])
    predicted_title, predicted_location = predict_job_title_and_location(skills)

    jobs = data["jobs"]
    matched_job_ids = find_most_similar_jobs(predicted_title, predicted_location, jobs)

    if matched_job_ids:
        result = {'id': matched_job_ids}
    else:
        result = {'id': []}

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
