package com.green.Team2Project.disaster.service;

import com.green.Team2Project.disaster.vo.DisasterVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("disasterService")
public class DisasterServiceImpl implements DisasterService{
    @Autowired
    private SqlSessionTemplate sqlSession;


    @Override
    public DisasterVO selectAllDisaster() {
        return sqlSession.selectOne("disasterMapper.selectAllDisaster");
    }
}
