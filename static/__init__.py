from flask import Flask, render_template, url_for
app = Flask(__name__, template_folder='static')

@app.route('/')
def index():
    # return render_template(url_for('static', filename='index.html'))
    return render_template('index.html')


@app.route('/about/')
def about():
    # return render_template(url_for('static', filename='about.html'))
    return render_template('about.html')

@app.route('/events/')
def events():
    # return render_template(url_for('static', filename='events.html'))
    return render_template('events.html')

@app.route('/contact/')
def contact():
    # return render_template(url_for('static', filename='contact.html'))
    return render_template('contact.html')

@app.route('/register/')
def register():
    # return render_template(url_for('static', filename='register.html'))
    return render_template('register.html')

@app.errorhandler(404)
def handle404(e):
    return "Oops! Looks like this webpage does not exist."


if __name__ == "__main__":
    app.run()