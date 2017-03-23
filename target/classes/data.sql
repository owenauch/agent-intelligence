insert into person(name, latitude, longitude, age, gender) select * from CSVREAD('/Users/owenauch/git/stormpath-spring-boot-jpa-example/src/main/resources/cc-maps-data-set.csv');
