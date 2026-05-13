import type { DayMasterSlug } from "@/lib/content/dayMasters";

/**
 * Seedream 5.0-lite prompts for each Day Master archetype.
 *
 * Shared style anchors (kept in every prompt for set-consistency):
 *   "中国古风工笔重彩"        traditional Chinese gongbi heavy color
 *   "全身正面构图"           full-body front-facing composition
 *   "典藏卡牌质感"           collectible card / 王者荣耀典藏 quality
 *   "粒子特效"               particle effects
 *
 * Variable: archetype character, costume, weapon/prop, scene, particle motif.
 */
export const PORTRAIT_PROMPTS: Record<DayMasterSlug, string> = {
  "yang-wood-jia":
    "中国古风工笔重彩,山林大王立绘,头戴翠玉冠身披青绿织锦大袍,手持苍木长剑插地,古杉森林晨雾朝霞,新芽嫩叶在身边萌发,翠绿光晕粒子特效,全身正面构图,典藏卡牌质感",

  "yin-wood-yi":
    "中国古风工笔重彩,缠藤花仙立绘,长裙妙龄女子身缠盛开的桃花藤蔓,桃花林春日花海背景,粉色花瓣随风飞舞,半透薄纱与藤蔓交织,花瓣粒子特效,全身正面构图,典藏卡牌质感",

  "yang-fire-bing":
    "中国古风工笔重彩,阳焰真君立绘,金红披风战神身后展开金乌火翼,手持烈焰长枪,烈日当空火云背景,赤红披风飞扬,火焰金辉粒子特效,全身正面构图,典藏卡牌质感",

  "yin-fire-ding":
    "中国古风工笔重彩,心灯仙子立绘,白纱长裙纤手提着古朴青灯,萤火星河夜林背景,星点萤火环绕,温暖烛光晕染,星光粒子特效,全身正面构图,典藏卡牌质感",

  "yang-earth-wu":
    "中国古风工笔重彩,山君立绘,赤色长髯魁梧大汉身披岩纹石甲腰挂玉佩,手持巨石长棍,高山之巅云海背景,沙尘飞扬岩裂纹理,土黄沙石粒子特效,全身正面构图,典藏卡牌质感",

  "yin-earth-ji":
    "中国古风工笔重彩,稻穗女神立绘,黄裙温柔女子怀抱金黄稻穗,金色麦田夕阳无边背景,谷粒在身边飞舞,丰收暖光弥漫,金黄米粒粒子特效,全身正面构图,典藏卡牌质感",

  // The one we already have a render of — kept consistent in style.
  "yang-metal-geng":
    "中国古风工笔重彩,武神立绘,身披银白战甲手持青龙偃月刀,冷月当空,血色披风飞扬,雪松林背景,刀光粒子特效,全身正面构图,典藏卡牌质感",

  "yin-metal-xin":
    "中国古风工笔重彩,凤冠贵妃立绘,凤冠霓裳身披珠玉锦缎手持夜明珠,夜宫烛光红柱背景,流光珠华环绕,珍珠白玉粒子特效,全身正面构图,典藏卡牌质感",

  "yang-water-ren":
    "中国古风工笔重彩,东海龙王立绘,青鳞战甲怒涛中跃起手持三叉戟,雷云怒海背景,水花雷电交织,海浪鳞光粒子特效,全身正面构图,典藏卡牌质感",

  "yin-water-gui":
    "中国古风工笔重彩,溪畔水灵立绘,纤瘦女子长发湿润垂落,薄纱水袖触碰水面,山涧雾气竹林背景,半透水雾环绕,涟漪雾气粒子特效,全身正面构图,典藏卡牌质感",
};

export const SHARED_PROMPT_TAIL = "";
