from flask import Flask, request, render_template, session, redirect, url_for, jsonify
import smtplib
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = "your_super_secure_secret_key"

    
@app.route('/api/register', methods=['POST'])
def register():
    # Retrieve email and password from request data
    email = request.json.get('email')
    password = request.json.get('password')
    name=request.json.get('name')
    age=request.json.get('age')
    session['email'] = email
    conn = sqlite3.connect('database3.db')
    conn.execute('CREATE TABLE IF NOT EXISTS User (email TEXT primary key, password TEXT)')
    cur = conn.cursor()

    cur.execute("INSERT INTO User (email, password,name,age) VALUES (?, ? ,? ,?)", (email, password, name, age))
    conn.commit()

    return jsonify(message='Registration successful'), 201


@app.route('/api/login', methods=['POST'])
def login():
    # Retrieve email and password from request data
    email = request.json.get('email')
    password = request.json.get('password')
    session['email'] = email
    conn = sqlite3.connect('database3.db')
    conn.execute('CREATE TABLE IF NOT EXISTS User (email TEXT primary key, password TEXT)')
    cur = conn.cursor()

    query = "SELECT password FROM User WHERE email = ?"
    db_mail = cur.execute(query, (email,)).fetchone()

    if db_mail is not None:
        if password == db_mail[0]:
            return jsonify(message='Login successful'), 200
        else:
            return jsonify(message='Wrong password'), 401
    else:
        return jsonify(message='Please register'), 401

@app.route('/api/adminlogin', methods=['POST'])
def adminlogin():
    # Retrieve email and password from request data
    email = request.json.get('email')
    password = request.json.get('password')
    session['email'] = email
    conn = sqlite3.connect('database3.db')  
    cur = conn.cursor()

    query = "SELECT password FROM Admin WHERE email = ?"
    db_admin = cur.execute(query, (email,)).fetchone()
    if db_admin is not None:
        if password == db_admin[0]:
            return jsonify(message='Login successful'), 200
        else:
            return jsonify(message='Wrong password'), 401
    else:
        return jsonify(message='Please use correct login credentials'), 401

@app.route('/api/logout')
def logout():
    if 'email' in session :
        # print('**********',email,'****************')
        session.pop('email', None)
        return jsonify(1)

@app.route('/api/data', methods=['GET'])
def get_data():
    # Connect to the database
    if 'email' in session :
        conn = sqlite3.connect('database3.db')
        cursor = conn.cursor()
        
        # Fetch data from the User table
        cursor.execute("SELECT age, score FROM User")
        data = cursor.fetchall()
        
        # Close the database connection
        cursor.close()
        conn.close()
        
        # Convert the data to a list of dictionaries
        result = []
        for row in data:
            result.append({'age': row[0], 'score': row[1]})
        
        # Return the data as JSON
        return jsonify(result)

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    if 'email' in session :
        # Connect to the database
        conn = sqlite3.connect('database3.db')
        c = conn.cursor()

        # Query to retrieve data from the User table
        query = """
            SELECT name,email, chancesremaining, score
            FROM User
            ORDER BY score DESC, chancesremaining DESC
        """
        c.execute(query)
        results = c.fetchall()

        # Close the database connection
        conn.close()

        # Convert the results to a list of dictionaries
        leaderboard = []
        for row in results:
            leaderboard.append({
                'name':row[0],
                'email': row[1],
                'chancesremaining': row[2],
                'score': row[3]
            })
        print(leaderboard)
        # Return the leaderboard data as JSON    
        return jsonify(leaderboard)


@app.route('/api/clue1', methods=['POST'])
def clue1():
    if 'email' in session :
    # Retrieve email and password from request data
        userinput1 = request.json.get('input')
        clue1 = request.json.get('a')
        usedhint=request.json.get('showHint')
        email = session.get('email')
        conn = sqlite3.connect('database3.db')
        conn.execute('CREATE TABLE IF NOT EXISTS CluesandAns (Clue TEXT primary key, Ans TEXT)')
        cur = conn.cursor()

        query = "SELECT Ans FROM CluesandAns WHERE Clue = ?"
        db_mail = cur.execute(query, (clue1,)).fetchone()
        remainquery="SELECT chancesremaining,Clue1 FROM User WHERE email = ?"
        remchances=cur.execute(remainquery,(email,)).fetchall()
        Ccheck1=remchances[0][1]
        print(db_mail[0],remchances,userinput1)
        if remchances[0][0]<1 :
            return jsonify(message='Chances Over Please go back'),401
        print(db_mail[0],userinput1,Ccheck1)
        if db_mail[0] == userinput1 and usedhint!=True and Ccheck1==0:
           
            cur.execute("UPDATE User SET score = score + 2 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=2,Clue1=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Login successful'), 200
        elif db_mail[0] == userinput1 and usedhint==True and Ccheck1==0:
            cur.execute("UPDATE User SET score = score + 1 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=2,Clue1=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Correct Answer'), 200
        elif(db_mail[0] == userinput1 and (usedhint==True or usedhint!=True) and Ccheck1==1):
            return jsonify(message='Correct Answer'), 200
        else :
            cur.execute("UPDATE User SET chancesremaining = chancesremaining - 1 WHERE email = ?", (email,))
            conn.commit()
            if(remchances[0][0]==1):
                return jsonify(message='Chances Over Please go back'),401
            return jsonify(message='Wrong Answer Try Again'), 401

@app.route('/api/clue2', methods=['POST'])
def clue2():
    if 'email' in session :
        # Retrieve email and password from request data
        userinput2 = request.json.get('input')
        clue2 = request.json.get('a')
        usedhint=request.json.get('showHint')
        email = session.get('email')
        conn = sqlite3.connect('database3.db')
        conn.execute('CREATE TABLE IF NOT EXISTS CluesandAns (Clue TEXT primary key, Ans TEXT)')
        cur = conn.cursor()
        query = "SELECT Ans FROM CluesandAns WHERE Clue = ?"
        db_mail = cur.execute(query, (clue2,)).fetchone()
        remainquery="SELECT chancesremaining,Clue2 FROM User WHERE email = ?"
        remchances=cur.execute(remainquery,(email,)).fetchall()
        Ccheck2=remchances[0][1]
        if remchances[0][0]<1 :
            return jsonify(message='Chances Over Please go back'),401
        if db_mail[0] == userinput2 and usedhint!=True and Ccheck2==0:
            cur.execute("UPDATE User SET score = score + 2 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=3,Clue2=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Login successful'), 200
        elif db_mail[0] == userinput2 and usedhint==True and Ccheck2==0:
            cur.execute("UPDATE User SET score = score + 1 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=3,Clue2=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Correct Answer'), 200
        elif(db_mail[0] == userinput2 and (usedhint==True or usedhint!=True) and Ccheck2==1):
            return jsonify(message='Correct Answer'), 200
        else :
            cur.execute("UPDATE User SET chancesremaining = chancesremaining - 1 WHERE email = ?", (email,))
            conn.commit()
            if(remchances[0][0]==1):
                return jsonify(message='Chances Over Please go back'),401
            return jsonify(message='Wrong Answer Try Again'), 401
@app.route('/api/clue3', methods=['POST'])
def clue3():
    if 'email' in session :
        # Retrieve email and password from request data
        userinput3 = request.json.get('input')
        clue3 = request.json.get('a')
        usedhint=request.json.get('showHint')
        email = session.get('email')
        conn = sqlite3.connect('database3.db')
        conn.execute('CREATE TABLE IF NOT EXISTS CluesandAns (Clue TEXT primary key, Ans TEXT)')
        cur = conn.cursor()
        query = "SELECT Ans FROM CluesandAns WHERE Clue = ?"
        db_mail = cur.execute(query, (clue3,)).fetchone()
        remainquery="SELECT chancesremaining,Clue3 FROM User WHERE email = ?"
        remchances=cur.execute(remainquery,(email,)).fetchall()
        Ccheck3=remchances[0][1]
        if remchances[0][0]<1 :
            return jsonify(message='Chances Over Please go back'),401
        if db_mail[0] == userinput3 and usedhint!=True and Ccheck3==0:
            cur.execute("UPDATE User SET score = score + 2 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=4,Clue3=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Login successful'), 200
        elif db_mail[0] == userinput3 and usedhint==True and Ccheck3==0:
            cur.execute("UPDATE User SET score = score + 1 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=4,Clue3=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Correct Answer'), 200
        elif(db_mail[0] == userinput3 and (usedhint==True or usedhint!=True) and Ccheck3==1):
            return jsonify(message='Correct Answer'), 200
        else :
            cur.execute("UPDATE User SET chancesremaining = chancesremaining - 1 WHERE email = ?", (email,))
            conn.commit()
            if(remchances[0][0]==1):
                return jsonify(message='Chances Over Please go back'),401
            return jsonify(message='Wrong Answer Try Again'), 401

@app.route('/api/clue4', methods=['POST'])
def clue4():
    if 'email' in session :
        # Retrieve email and password from request data
        userinput4 = request.json.get('input')
        clue4 = request.json.get('a')
        usedhint=request.json.get('showHint')
        email = session.get('email')
        conn = sqlite3.connect('database3.db')
        conn.execute('CREATE TABLE IF NOT EXISTS CluesandAns (Clue TEXT primary key, Ans TEXT)')
        cur = conn.cursor()
        query = "SELECT Ans FROM CluesandAns WHERE Clue = ?"
        db_mail = cur.execute(query, (clue4,)).fetchone()
        remainquery="SELECT chancesremaining,Clue4 FROM User WHERE email = ?"
        remchances=cur.execute(remainquery,(email,)).fetchall()
        Ccheck4=remchances[0][1]
        if remchances[0][0]<1 :
            return jsonify(message='Chances Over Please go back'),401
        if db_mail[0] == userinput4 and usedhint!=True and Ccheck4==0:
            cur.execute("UPDATE User SET score = score + 2 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=5,Clue4=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Login successful'), 200
        elif db_mail[0] == userinput4 and usedhint==True and Ccheck4==0:
            cur.execute("UPDATE User SET score = score + 1 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=5,Clue4=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Correct Answer'), 200
        elif(db_mail[0] == userinput4 and (usedhint==True or usedhint!=True) and Ccheck4==1):
            return jsonify(message='Correct Answer'), 200
        else :
            cur.execute("UPDATE User SET chancesremaining = chancesremaining - 1 WHERE email = ?", (email,))
            conn.commit()
            if(remchances[0][0]==1):
                return jsonify(message='Chances Over Please go back'),401
            return jsonify(message='Wrong Answer Try Again'), 401
@app.route('/api/clue5', methods=['POST'])
def clue5():
    if 'email' in session :
    # Retrieve email and password from request data
        userinput5 = request.json.get('input')
        clue5= request.json.get('a')
        usedhint=request.json.get('showHint')
        email = session.get('email')
        conn = sqlite3.connect('database3.db')
        conn.execute('CREATE TABLE IF NOT EXISTS CluesandAns (Clue TEXT primary key, Ans TEXT)')
        cur = conn.cursor()

        query = "SELECT Ans FROM CluesandAns WHERE Clue = ?"
        db_mail = cur.execute(query, (clue5,)).fetchone()
        remainquery="SELECT chancesremaining,Clue5 FROM User WHERE email = ?"
        remchances=cur.execute(remainquery,(email,)).fetchall()
        Ccheck5=remchances[0][1]
        if remchances[0][0]<1 :
            return jsonify(message='Chances Over Please go back'),401
        if db_mail[0] == userinput5 and usedhint!=True and Ccheck5==0:
            cur.execute("UPDATE User SET score = score + 2 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=6,Clue5=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Login successful'), 200
        elif db_mail[0] == userinput5 and usedhint==True and Ccheck5==0:
            cur.execute("UPDATE User SET score = score + 1 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=6,Clue5=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Correct Answer'), 200
        elif(db_mail[0] == userinput5 and (usedhint==True or usedhint!=True) and Ccheck5==1):
            return jsonify(message='Correct Answer'), 200
        else :
            cur.execute("UPDATE User SET chancesremaining = chancesremaining - 1 WHERE email = ?", (email,))
            conn.commit()
            if(remchances[0][0]==1):
                return jsonify(message='Chances Over Please go back'),401
            return jsonify(message='Wrong Answer Try Again'), 401
@app.route('/api/clue6', methods=['POST'])
def clue6():
    if 'email' in session :
    # Retrieve email and password from request data
        userinput6 = request.json.get('input')
        clue6 = request.json.get('a')
        usedhint=request.json.get('showHint')
        email = session.get('email')
        conn = sqlite3.connect('database3.db')
        conn.execute('CREATE TABLE IF NOT EXISTS CluesandAns (Clue TEXT primary key, Ans TEXT)')
        cur = conn.cursor()

        query = "SELECT Ans FROM CluesandAns WHERE Clue = ?"
        db_mail = cur.execute(query, (clue6,)).fetchone()
        remainquery="SELECT chancesremaining,Clue6 FROM User WHERE email = ?"
        remchances=cur.execute(remainquery,(email,)).fetchall()
        Ccheck6=remchances[0][1]
        if remchances[0][0]<1 :
            return jsonify(message='Chances Over Please go back'),401
        if db_mail[0] == userinput6 and usedhint!=True and Ccheck6==0:
            cur.execute("UPDATE User SET score = score + 2 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=7,Clue6=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Login successful'), 200
        elif db_mail[0] == userinput6 and usedhint==True and Ccheck6==0:
            cur.execute("UPDATE User SET score = score + 1 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=7,Clue6=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Correct Answer'), 200
        elif(db_mail[0] == userinput6 and (usedhint==True or usedhint!=True) and Ccheck6==1):
            return jsonify(message='Correct Answer'), 200
        else :
            cur.execute("UPDATE User SET chancesremaining = chancesremaining - 1 WHERE email = ?", (email,))
            conn.commit()
            if(remchances[0][0]==1):
                return jsonify(message='Chances Over Please go back'),401
            return jsonify(message='Wrong Answer Try Again'), 401

@app.route('/api/clue7', methods=['POST'])
def clue7():
    if 'email' in session :
    # Retrieve email and password from request data
        userinput7 = request.json.get('input')
        clue7 = request.json.get('a')
        usedhint=request.json.get('showHint')
        email = session.get('email')
        conn = sqlite3.connect('database3.db')
        conn.execute('CREATE TABLE IF NOT EXISTS CluesandAns (Clue TEXT primary key, Ans TEXT)')
        cur = conn.cursor()

        query = "SELECT Ans FROM CluesandAns WHERE Clue = ?"
        db_mail = cur.execute(query, (clue7,)).fetchone()
        remainquery="SELECT chancesremaining,Clue7 FROM User WHERE email = ?"
        remchances=cur.execute(remainquery,(email,)).fetchall()
        Ccheck7=remchances[0][1]
        if remchances[0][0]<1 :
            return jsonify(message='Chances Over Please go back'),401
        if db_mail[0] == userinput7 and usedhint!=True and Ccheck7==0:
            cur.execute("UPDATE User SET score = score + 2 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=8,Clue7=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Login successful'), 200
        elif db_mail[0] == userinput7 and usedhint==True and Ccheck7==0:
            cur.execute("UPDATE User SET score = score + 1 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=8,Clue7=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Correct Answer'), 200
        elif(db_mail[0] == userinput7 and (usedhint==True or usedhint!=True) and Ccheck7==1):
            return jsonify(message='Correct Answer'), 200
        else :
            cur.execute("UPDATE User SET chancesremaining = chancesremaining - 1 WHERE email = ?", (email,))
            conn.commit()
            if(remchances[0][0]==1):
                return jsonify(message='Chances Over Please go back'),401
            return jsonify(message='Wrong Answer Try Again'), 401

@app.route('/api/clue8', methods=['POST'])
def clue8():
    if 'email' in session :
    # Retrieve email and password from request data
        userinput8 = 'abc'
        clue8 = request.json.get('a')
        usedhint=request.json.get('showHint')
        email = session.get('email')
        conn = sqlite3.connect('database3.db')
        conn.execute('CREATE TABLE IF NOT EXISTS CluesandAns (Clue TEXT primary key, Ans TEXT)')
        cur = conn.cursor()

        query = "SELECT Ans FROM CluesandAns WHERE Clue = ?"
        db_mail = cur.execute(query, (clue8,)).fetchone()
        remainquery="SELECT chancesremaining,Clue8 FROM User WHERE email = ?"
        remchances=cur.execute(remainquery,(email,)).fetchall()
        Ccheck8=remchances[0][1]
        print(userinput8,'1111111')
        print(db_mail[0],'2222222')
        if remchances[0][0]<1 :
            return jsonify(message='Chances Over Please go back'),401
        if db_mail[0] == userinput8 and usedhint!=True and Ccheck8==0:
            cur.execute("UPDATE User SET score = score + 2 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=9,Clue8=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Login successful'), 200
        elif db_mail[0] == userinput8 and usedhint==True and Ccheck8==0:
            cur.execute("UPDATE User SET score = score + 1 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=9,Clue8=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Correct Answer'), 200
        elif(db_mail[0] == userinput8 and (usedhint==True or usedhint!=True) and Ccheck8==1):
            return jsonify(message='Correct Answer'), 200
        else :
            cur.execute("UPDATE User SET chancesremaining = chancesremaining - 1 WHERE email = ?", (email,))
            conn.commit()
            if(remchances[0][0]==1):
                return jsonify(message='Chances Over Please go back'),401
            return jsonify(message='Wrong Answer Try Again'), 401
@app.route('/api/clue9', methods=['POST'])
def clue9():
    if 'email' in session :
    # Retrieve email and password from request data
        userinput9 = request.json.get('input')
        clue9 = request.json.get('a')
        usedhint=request.json.get('showHint')
        email = session.get('email')
        conn = sqlite3.connect('database3.db')
        conn.execute('CREATE TABLE IF NOT EXISTS CluesandAns (Clue TEXT primary key, Ans TEXT)')
        cur = conn.cursor()

        query = "SELECT Ans FROM CluesandAns WHERE Clue = ?"
        db_mail = cur.execute(query, (clue9,)).fetchone()
        remainquery="SELECT chancesremaining,Clue9 FROM User WHERE email = ?"
        remchances=cur.execute(remainquery,(email,)).fetchall()
        Ccheck9=remchances[0][1]
        if remchances[0][0]<1 :
            return jsonify(message='Chances Over Please go back'),401
        if db_mail[0] == userinput9 and usedhint!=True and Ccheck9==0:
            cur.execute("UPDATE User SET score = score + 2 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=10,Clue9=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Login successful'), 200
        elif db_mail[0] == userinput9 and usedhint==True and Ccheck9==0:
            cur.execute("UPDATE User SET score = score + 1 WHERE email = ?", (email,))
            conn.commit()
            cur.execute("UPDATE User SET currentquestion=10,Clue9=1 WHERE email = ?", (email,))
            conn.commit()
            return jsonify(message='Correct Answer'), 200
        elif(db_mail[0] == userinput9 and (usedhint==True or usedhint!=True) and Ccheck9==1):
            return jsonify(message='Correct Answer'), 200
        else :
            cur.execute("UPDATE User SET chancesremaining = chancesremaining - 1 WHERE email = ?", (email,))
            conn.commit()
            if(remchances[0][0]==1):
                return jsonify(message='Chances Over Please go back'),401
            return jsonify(message='Wrong Answer Try Again'), 401
    
@app.route('/api/scorestatus', methods=['GET'])
def scorestatus():
    if 'email' in session :
        email = session.get('email')
        conn = sqlite3.connect('database3.db')
        c = conn.cursor()
        query = "SELECT chancesremaining, score FROM User WHERE email = ?"
        result = c.execute(query, (email,)).fetchall()
        # results = c.fetchall()
        print(result)
        conn.close()
        if result:
            print(result)
            user_data = {
                'chancesremaining':  result[0][0],
                'score' : result[0][1]
            }
            return jsonify(user_data), 200  # Return user data as JSON response
        else:
            return jsonify({'message': 'No user found'}), 404
    
@app.route('/api/restart', methods=['POST'])
def restart():
    if 'email' in session :
        email = session.get('email')
        conn = sqlite3.connect('database3.db')
        conn.execute('CREATE TABLE IF NOT EXISTS CluesandAns (Clue TEXT primary key, Ans TEXT)')
        cur = conn.cursor()
        cur.execute("UPDATE User SET score = 0, chancesremaining=3, currentquestion=1 WHERE email = ?", (email,))
        cur.execute("UPDATE User SET Clue1=0,Clue2=0,Clue3=0,Clue4=0,Clue5=0,Clue6=0,Clue7=0,Clue8=0,Clue9=0 WHERE email = ?", (email,))
        conn.commit()
        return jsonify(message='Changed successful'), 200
    
@app.route('/api/changepage', methods=['GET'])
def changepage():
    if 'email' in session :
        email = session.get('email')
        conn = sqlite3.connect('database3.db')
        query = "SELECT currentquestion FROM User WHERE email = ?"
        result = conn.execute(query, (email,)).fetchone()
        print(result[0])
        return jsonify(result[0]), 200
    
@app.route('/sample',methods=['GET'])
def sample():
    if 'email' in session :
        print("Yes logged in ")
    else :
        print("Please Log in ")
    

if __name__ == '__main__':
    app.run(debug=True,port=5000)
