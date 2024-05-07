package com.green.Team2Project.causing.controller;

import com.green.Team2Project.causing.service.CausingService;
import com.green.Team2Project.causing.vo.CausingVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


@Controller
@RequestMapping("/causing")
public class CausingController {
        @Resource(name = "causingService")
        private CausingService causingService;

        @PostMapping("/selectAllCausing")
        @ResponseBody
        public List<CausingVO> selectAllCausing(){
            List<CausingVO> causingList = causingService.selectAllCausing();
            return causingList;
        }
}
