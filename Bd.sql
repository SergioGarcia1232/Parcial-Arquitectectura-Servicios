CREATE TABLE vehiculo(
    id_Vehiculo PRIMARY KEY,
    car varchar (300) NOT NULL,
    car_model varchar(200) NOT NULL,
    car_color varchar (300), 
    car_model_year INT,
    car_vin varchar (300) UNIQUE NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    availability BOOLEAN NOT NULL,
    user_id INT,
    FOREING KEY (user_id) REFERENCES usuarios(id)
);