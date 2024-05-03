package com.green.Team2Project.geo.service;

import com.green.Team2Project.geo.vo.GeoVO;

import java.util.List;
import java.util.Map;

public interface GeoService {

    List<Map<String, Integer>> geoSelect(GeoVO geoVO);
}
