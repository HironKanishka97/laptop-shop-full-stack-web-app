package com.hklapstore.backend.util.mapper;

import com.hklapstore.backend.dto.ProductDto;
import com.hklapstore.backend.dto.UserDto;
import com.hklapstore.backend.entity.Product;
import com.hklapstore.backend.entity.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toDto(User user);

    User toEntity(UserDto userDto);

//    List<UserDto> userListToDtoList(List<User> userList);


}