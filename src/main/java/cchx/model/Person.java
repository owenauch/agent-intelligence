package intel.model;

import javax.persistence.*;

// create person class that's accessible with data.sql
@Entity
@Table(name = "person")
public class Person {
	// id value
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	// various properties and methods
	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private float latitude;

	@Column(nullable = false)
	private float longitude;

	@Column(nullable = false)
	private int age;

	@Column(nullable = false)
	private String gender;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getLatitude() {
		return latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public float getLongitude() {
		return longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}
}
