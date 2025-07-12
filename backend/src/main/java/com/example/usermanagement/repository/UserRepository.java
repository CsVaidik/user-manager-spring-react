package com.example.usermanagement.repository;

import com.example.usermanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // ✅ For registration - check if email already exists
    boolean existsByEmail(String email);

    // ✅ For login - fetch user by email
    User findByEmail(String email);
}
