package com.green.Team2Project.home.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("homeService")
public class HomeServiceImpl implements HomeService{
    @Autowired
    private SqlSessionTemplate sqlSession;
}
