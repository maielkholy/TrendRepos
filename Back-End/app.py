from flask import Flask,jsonify
from datetime import timedelta,date
import requests
import json

app = Flask(__name__)
#configure to return pretty JSON
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

#Load top 100 repos created within 30 days
@app.route('/', methods=['GET'])
def get_api_repos():
    start_date= (date.today()-timedelta(days=30)).isoformat()
    api= "https://api.github.com/search/repositories?q=created:>"+start_date+"&sort=stars&order=desc&per_page=100"
    r = requests.get(api)
    repos_dict = json.loads(r.content)
    repos = repos_dict.get('items')
    languagesData= jsonify(get_languages(repos))
    return languagesData
#Retrieve languages from Repos
def get_languages(repos):
    languages= {}
    output=[]   
    index=0
    for item in repos:
        language=item.get("language")
        repoUrl = item.get("html_url")
        if language in languages:
            languageDict= output[languages.get(language)]
            languageDict["count"]+=1
            languageDict["repoUrl"].append(repoUrl)
        else:
            languages[language]=index
            index+=1
            newDictionary= {"language":language,
                            "count":1,
                            "repoUrl":[repoUrl] }
            output.append(newDictionary)
    return output

if __name__ == '__main__':
    app.run(debug=True)
