from flask import Flask, render_template, url_for, redirect, url_for, request, flash, session
from flask_sqlalchemy import SQLAlchemy
# from flask.ext.session import Session


#Postgres port: 5432

app = Flask(__name__, template_folder='static')
app.secret_key = "hsdkhfkdjhkfh"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:hello@localhost/registrations'
db = SQLAlchemy(app)

class Participant(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(60))
    lastName = db.Column(db.String(60))
    email = db.Column(db.String(120))
    number = db.Column(db.String(13))
    college = db.Column(db.String(100))
    branch = db.Column(db.String(10))
    year = db.Column(db.Integer)
    events = db.Column(db.String(120))


    def __init__(self, firstName, lastName, email, number, college, branch, year, events):
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.number = number
        self.college = college
        self.branch = branch
        self.year = year
        self.events = events

    def __repr__(self):
        return '<Participant %r>' % self.firstName

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60))
    email = db.Column(db.String(120))
    message = db.Column(db.String(1000))

    def __init__(self, name, email, message):
        self.name = name
        self.email = email
        self.message = message

    def __repr__(self):
        return '<Message %r>' % self.name

db.create_all()


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


@app.route('/contact/', methods=['POST'])
def confirmContact():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        msg = request.form.get("msg")

        newMessage = Message(name, email, msg)

        try:
            db.session.add(newMessage)
            db.session.commit()
            flash('Thank you for contacting us! Give us some time to get back to you.')
        except:  # Exception as e:
            # flash(e)
            flash('An error has occured. Please try again later or get in touch with us to fix it.')
            # redirect(url_for('index'))

        return redirect(url_for('confirmContact'))

    else:
        return redirect(url_for('index'))





@app.route('/register/')
def register():
    # return render_template(url_for('static', filename='register.html'))
    return render_template('register.html')


@app.route('/register/', methods=['POST'])
def finishRegistration():
    if request.method =="POST":
        fname = request.form.get("FName")
        lname = request.form.get("LName")
        email = request.form.get("email")
        number = request.form.get("number")
        college = request.form.get("college")
        branch = request.form.get("branch")
        year = request.form.get("year")
        events = request.form.getlist("events")

        participant = Participant(fname, lname, email, number, college, branch, year, events)

        try:
            db.session.add(participant)
            db.session.commit()
            flash('Record was successfully added.')
        except: #  Exception as e:
            # flash(e)
            flash('An error has occured. Please try again later or get in touch with us to fix it.')
            # redirect(url_for('index'))

        return redirect(url_for('finishRegistration'))
    else:
        return redirect(url_for('index'))


@app.route('/team/')
def team():
    return render_template('team.html')

@app.errorhandler(404)
def handle404(e):
    return "Oops! Looks like this webpage does not exist. Click <a href=\"../\">here</a> to go back."


if __name__ == "__main__":
    app.run()