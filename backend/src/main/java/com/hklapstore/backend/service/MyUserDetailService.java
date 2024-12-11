package com.hklapstore.backend.service;

import com.hklapstore.backend.dto.security.MyUserDetail;
import com.hklapstore.backend.entity.User;
import com.hklapstore.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        System.out.println(username);
        User user = userRepo.findByUsername(username);
        if (user == null) {
            System.out.println("user not found");
            throw new UsernameNotFoundException("User not found");
        } else {
            return new MyUserDetail(user);
        }
    }
}