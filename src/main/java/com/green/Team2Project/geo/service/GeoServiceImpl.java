package com.green.Team2Project.geo.service;

import com.green.Team2Project.geo.vo.GeoVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("geoService")
public class GeoServiceImpl implements GeoService{
    @Autowired
    SqlSessionTemplate sqlSession;

    @Override
    public List<Map<String, Integer>> geoSelect(GeoVO geoVO) {
        return sqlSession.selectList("geoMapper.geoSelect", geoVO);
    }
}
