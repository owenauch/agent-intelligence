insert into person(name, latitude, longitude, age, gender) select * from CSVREAD('src/main/resources/cc-maps-data-set.csv');
