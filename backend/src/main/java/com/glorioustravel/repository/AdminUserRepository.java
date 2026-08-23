package com.glorioustravel.repository;

import com.glorioustravel.entity.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {
    java.util.Optional<AdminUser> findByEmail(String email);
}
