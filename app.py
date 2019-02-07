from flask import Flask, render_template, url_for
# from flask.ext.sqlalchemy import SQLAlchemy

#Postgres port: 5432

app = Flask(__name__, template_folder='static')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/pre-registration'
# db = SQLAlchemy(app)

# class User(db.Model):
#     __tablename__ = "users"
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(120), unique=True)

#     def __init__(self, email):
#         self.email = email

#     def __repr__(self):
#         return '<E-mail %r>' % self.email


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

@app.route('/register/', methods=['GET', 'POST'])
def register():
    # return render_template(url_for('static', filename='register.html'))
    return render_template('register.html')

@app.route('/team/')
def team():
    return render_template('team.html')

@app.errorhandler(404)
def handle404(e):
    return "Oops! Looks like this webpage does not exist. Click <a href=\"../\">here</a> to go back."


if __name__ == "__main__":
    app.run()