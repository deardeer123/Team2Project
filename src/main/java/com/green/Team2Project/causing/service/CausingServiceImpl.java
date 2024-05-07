package com.green.Team2Project.causing.service;

import com.green.Team2Project.causing.vo.CausingVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("causingService")
public class CausingServiceImpl implements CausingService{
    @Autowired
    private SqlSessionTemplate sqlSession;


    @Override
    public List<CausingVO> selectAllCausing() {
        return sqlSession.selectList("causingMapper.selectAllCausing");
    }
}
