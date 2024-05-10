package com.green.Team2Project.causing.controller;

import com.green.Team2Project.causing.service.CausingService;
import com.green.Team2Project.causing.vo.CausingVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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

        @GetMapping("/goCausingDetail")
        public String goCausingDetail(Model model){
            model.addAttribute("causingVO",causingService.selectOneCausing(2022));

            return "/content/causing/team2_causing_detail";
        }

        @PostMapping("/selectOneCausing")
        @ResponseBody
        public CausingVO selectOneCausing(@RequestParam(name = "occurredYear",defaultValue = "0" ,required = false)int occurredYear){

            CausingVO causingVO = causingService.selectOneCausing(2022);
            return causingVO;
        }

        @PostMapping("/total")
        @ResponseBody
        public CausingVO total(@RequestParam(name = "occurredYear",defaultValue = "0" ,required = false)int occurredYear){
            System.out.println(causingService.total(2022));
            return causingService.total(occurredYear);
        }

}
