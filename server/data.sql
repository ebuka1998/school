CREATE TABLE students (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    isAdmin boolean DEFAULT FALSE,
    name_of_student VARCHAR(100) NOT NULL,
    age_of_sudent VARCHAR(10) NOT NULL,
    student_password VARCHAR NOT NULL,
    image_url VARCHAR DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    date_created DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE assignments (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    subject VARCHAR(50) NOT NULL,
    questions TEXT NOT NULL,
    date_created DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE answers (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    assignment_id BIGINT REFERENCES assignments(id) ON DELETE CASCADE NOT NULL ,
    student_id BIGINT REFERENCES students(id) ON DELETE CASCADE NOT NULL ,
    answer TEXT,
    grade VARCHAR(50),
    remark VARCHAR(200),
    date_answered TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     
);

INSERT INTO students (name_of_student, age_of_sudent, isAdmin, student_password) VALUES ('Okafor Ezugo', '17', TRUE, pass1234);
INSERT INTO assignments (subject, questions) VALUES ('chemistry', '1. What is electrolysis, 2. define acid, base and salt');
INSERT INTO answers (assignment_id, student_id, answer) VALUES (6, 4, 'my answer is unique');

UPDATE students SET isAdmin = TRUE WHERE id = 1;

select answer, grade, remark, date_answered, answers.id, subject, questions, assignments.id as id_assignment, name_of_student, age_of_student, students.id as id_students from answers left join students on answers.student_id = students.id left join assignments on answers.assignment_id = assignments.id;
select answer, answers.id, subject, questions, assignments.id as id_assignment, students.id as id_students from answers left join students on answers.student_id = students.id left join assignments on answers.assignment_id = assignments.id WHERE assignments.id = $1 AND students.id = $2;