package com.dreamproject.inwords.data.entity;

import android.arch.persistence.room.Entity;
import android.arch.persistence.room.PrimaryKey;

@Entity(tableName = "user_table")
public class User{
    @PrimaryKey
    private int userId;
    private String userName;
    private String firstName;
    private String middleName;
    private String lastName;
    private String password;

    public User(int userId, String userName, String firstName, String middleName, String lastName, String password) {
        this.userId = userId;
        this.userName = userName;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.password = password;
    }

    public int getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPassword() {
        return password;
    }

    //@SerializedName("value")
}
