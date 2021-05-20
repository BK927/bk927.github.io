import React, { Fragment, useState } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Paper from "@material-ui/core/Paper";
import useStyles from "asset/style/style";
import ButtonToAction from "components/ButtonToAction";
import PersonalityDetail from "components/ChracterMaker/PersonalityDetail";

// TODO: Ugly readability at domains. Fix it.
const CharacterMaker = () => {
  const classes = useStyles();
  const [isGenerated, setIsGenerated] = useState(false);

  const [domains, setDomains] = useState([
    {
      domain: "외향성(Extraversion)",
      description:
        '외향성은 외부 세계와의 확고한 관계에 의해 표시됩니다. 외향관은 사람들과 함께 있는 것을 즐기고, 에너지가 풍부하며, 긍정적인 감정을 자주 경험합니다. 그들은 열렬하고 행동 지향적인 경향이 있으며 "그렇습니다!"라고 말하기 쉽습니다. 또는 재미를 찾으러 "가자!"라고 합니다. 모임에서 그들은 말하기를 좋아하고, 자기주장을 하며, 스스로에게 관심을 집중시키기를 좋아합니다.\n 내향성은 활력, 에너지 및 활동 수준이 부족합니다. 그들은 조용하고, 낮은 텐션이며, 계획적이며, 사회적인 세계로부터 이탈하는 경향이 있습니다. 그들의 부족한 사회적 참여를 수줍음이나 우울증으로 해석해서는 안 됩니다 . 내향성은 단순히 외향적 사람보다 자극이 덜 필요하며 혼자있는 것을 선호합니다. 내향적 성향의 독립성과 신중함은 종종 불친절함이나 오만함으로 착각합니다. 실제로는, agreeableness 차원에서 높은 점수를 받은 내향적인 사람은 본인이 남을 찾아가지는 않지만, 누군가가 자신을 찾아온다면 좋아할 것입니다.',
      facets: [
        {
          name: "친근함(Friendliness)",
          description:
            "친근한 사람들은 다른 사람들을 진정으로 좋아하고 긍정적인 감정을 공개적으로 드러냅니다. 친구를 빨리 사귈 수 있으며 친밀한 관계를 형성하기 쉽습니다. 친근함에서 낮은 점수를 획득한 사람은 반드시 냉정하고 적대적인 것은 아니지만, 타인에게 접근하지 않으며 거리감이 있고 내성적인 사람으로 인식됩니다.",
        },
        {
          name: "사교성(Gregariousness)",
          description:
            "사교적인 사람들은 단체의 즐거운 자극과 보상을 찾아냅니다. 그들은 군중의 흥분을 즐기는 경향이 있습니다. 낮은 득점자는 압도되는 경향이 있으므로 큰 군중들을 적극적으로 기피하는 경향이 있습니다. 그들은 때로는 사람들과 함께하는 것을 싫어하는 것은 아니지만, 프라이버시와 자신에 대한 시간의 필요성은 해당 영역에서 높은 점수를 얻은 개인보다 훨씬 큽니다.",
        },
        {
          name: "자기 주장(Assertiveness)",
          description:
            "자기 주장에서 높은 점수를 획득한 사람은 발언권을 가져가고, 책임을 지며, 다른 사람에게 활동을 지시하는 것을 좋아합니다. 그들은 그룹의 리더가 되는 경향이 있습니다. 점수가 낮은 사람은 많이 말하지 않고 다른 사람들이 그룹 활동을 통제하게 만듭니다. ",
        },
        {
          name: "활동적인 정도(Activity Level)",
          description:
            "활동적인 개인은 빠른 속도로 바쁜 삶을 살아갑니다. 그들은 빠르게, 정력적으로, 그리고 활발하게 움직이며 많은 활동에 참여합니다. 이 척도에서 점수가 낮은 사람들은 느리고 여유있게 느긋한 페이스를 따릅니다.",
        },
        {
          name: "자극-추구(Excitement-Seeking)",
          description:
            "이 영역의 고득점 자들은 높은 수준의 자극없이는 쉽게 지루해 합니다. 그들은 밝은 불빛을 사랑하고 부산을 떱니다. 그들은 위험을 감수하고 스릴을 추구합니다. 낮은 득점자는 소음과 소동에 압도 당하고 스릴을 추구하는데 부정적입니다.",
        },
        {
          name: "쾌활함(Cheerfulness)",
          description:
            "이 척도는 부정적인 감정 이 아닌 긍정적 기분과 감정을 측정합니다(신경학적 영역의 일부임). 이 척도에서 높은 점수를 받은 사람은 일반적으로 행복, 열정, 낙천주의 및 기쁨을 포함하여 긍정적인 감정을 경험합니다. 낮은 득점자들은 그렇게 정력적이고 명량하기 쉽지 않습니다.",
        },
      ],
    },
    {
      domain: "수용성(Agreeableness)",
      description:
        "수용성은 협동성과 사회적 조화에 대한 개인의 차이를 반영합니다. 수용적 사람들은 다른 사람들과 어울리는 것을 중요하게 생각합니다. 그러므로 그들은 사려 깊고, 친절하며, 관대하고, 타인을 도우며, 타인과의 이익을 위해 타협하고자 합니다. 수용적인 사람들은 또한 인간 본성에 대해 낙관적인 견해를 가지고 있습니다. 그들은 사람들이 기본적으로 정직하고, 예의 바르며, 믿을만 하다고 믿습니다/n비수용적인 개인은 다른 사람들과 어울리는 것보다 자기 이익을 우선시합니다. 그들은 일반적으로 다른 사람의 복지에 관심이 없기 때문에 다른 사람들을 위해 자신이 베풀 가능성은 거의 없습니다. 때때로 다른 사람들의 동기에 대한 회의적인 태도는 의심하며, 비우호적이며, 비협조이게 합니다.\n수용성은 인기를 얻고 유지하는데 확실히 유리합니다. 수용적인 사람들은 비수용적인 사람들보다 더 사랑받습니다. 반면에 수용성은 냉정하거나 절대적인 목표를 위한 결정을 내려야 하는 상황에서는 유용하지 않습니다. 비수용적인 사람들은 훌륭한 과학자, 비평가, 군인이 될 수 있습니다.",
      facets: [
        {
          name: "수용성(Agreeableness)",
          description:
            "높은 신뢰를 가진 사람은 대부분의 사람들이 공정하고 정직하며 좋은 의도를 가지고 있다고 가정합니다. 신뢰도가 낮은 사람들은 다른 사람들을 이기적이고, 사악하며 잠재적으로 위험한 것으로 봅니다.",
        },
        {
          name: "도덕성(Morality)",
          description:
            "이 척도에서 높은 점수를 받는 사람들은 다른 사람들을 상대 할 때 가식적이거나 속일 필요가 없다고 생각하므로 솔직하고 진솔합니다. 낮은 득점자는 사회적 관계에서 어느 정도의 기만이 필요하다고 생각합니다. 사람들은 비교적 간단하게 이 척도에서 고득점자들을 척도와 연관시켜서 생각합니다. 보통 이 척도에서 낮은 점수를 받은 사람들이 실질적으로 크게 실제 척도와 연관 되어지지 않는 것을 발견합니다. 낮은 득점자가 파렴치하거나 비도덕적이지 않다는 것을 분명히 해야합니다. 그들은 단순히 더 많은 방어적이고 공개적으로 모든 진실을 밝히기를 꺼려합니다.",
        },
        {
          name: "이타심(Altruism)",
          description:
            "이타적인 사람들은 다른 사람들이 진심으로 이익을 얻을 수 있도록 도와줍니다. 결과적으로, 그들은 일반적으로 도움이 필요한 사람들을 기꺼이 도우려고 합니다. 이타적인 사람들은 다른 사람들을 위해 일하는 것이 자기 희생이 아닌 자기 실현의 한 형태라는 것을 알고 있습니다. 이 척도의 점수가 낮은 사람은 도움이 필요한 사람들을 돕는 것을 특별히 좋아하지 않습니다. 도움 요청은 자아 실현을 위한 기회라기보다는 부과처럼 느낍니다.",
        },
        {
          name: "협동성(Cooperation)",
          description:
            "이 척도에서 높은 점수를 얻은 개인은 대립을 싫어합니다. 그들은 다른 사람들과 어울리기 위해 자신의 욕구를 타협하거나 부인하기를 꺼리지 않습니다. 이 척도에서 점수가 낮은 사람들은 다른 사람들의 길을 위협 할 가능성이 더 큽니다.",
        },
        {
          name: "겸손(Modesty)",
          description:
            "이 척도의 고득점 자들은 자신이 다른 사람들보다 낫다 고 주장하는 것을 좋아하지 않습니다. 어떤 경우에는 이러한 태도가 낮은 자신감이나 자존심에서 파생 되는 것일 수 있습니다. 그럼에도 불구하고 높은 자부심을 가진 일부 사람들은 볼썽사납고 천박하다는 것으로 보입니다. 자기 자신을 우수하다고 자랑하는 사람들은 배타적으로 오만하다고 다른 사람들에게 보여지는 경향이 있습니다.",
        },
        {
          name: "동정심(Sympathy)",
          description:
            "이 척도에서 높은 점수를 얻은 사람들은 다정하고 동정심이 많습니다. 그들은 다른 사람들의 고통을 간접적으로 느끼고 동정심을 느낄 가능성이 높습니다. 낮은 점수의 사람들은 인간의 고통에 강하게 영향을 받지 않습니다. 그런 사람들은 이성에 따라 객관적인 판단을 내리는 데 자부심을 느낍니다. 그들은 자비보다 진리와 공평한 정의에 더 관심이 있습니다.",
        },
      ],
    },
    {
      domain: "성실성(Conscientiousness)",
      description:
        "성실성은 우리가 우리의 충동을 조절, 절제 및 관리하는 방식에 관련됩니다. 충동은 본질적으로 나쁘지 않습니다. 때로는 시간 제약으로 신속한 결정이 필요하며, 우리의 첫 번째 충동에 따르는 것이 효과적인 대응이 될 수 있습니다. 또한, 일보다는 놀이의 시간에, 자발적이고 충동적인 행동은 재미있을 수 있습니다. 충동적인 개인은 다른 사람들이 다채롭고 재미있게 보며 엉뚱해 보일 수 있습니다.\n그럼에도 불구하고, 충동에 따르면 여러 가지 문제가 발생할 수 있습니다. 일부 충동은 반사회적입니다. 통제되지 않은 반사회적 행위는 다른 사회 구성원에게 해를 끼칠뿐만 아니라 그러한 충동적인 행동을 한 가해자에게 응징을 초래할 수 있습니다. 충동적인 행동에 대한 또 다른 문제점은 충동에 따르는 것은 즉각적인 보상을 하지만 종종 바람직하지 않은 장기적인 결과를 초래한다는 것입니다. 예를 들어 과도한 사교 활동으로 인해 직장에서 해고되거나 중요한 관계가 해체되거나 결국 건강을 해치는 마약을 남용하게 됩니다.\n충동적인 행동은 비록 심각하게 파괴적이지 않더라도 의미있게 사람의 효율성을 감소시킵니다. 충동적으로 행동하는 것은 대안의 행동 과정을 심사 숙고하지 못하게 하는데, 그 대안 중 일부는 충동적인 선택보다 현명할 것입니다. 충동은 또한 단계적으로 또는 단계적으로 체계화 된 순서가 요구되는 프로젝트에서 사람들을 삼천포로 빠지게 합니다. 따라서 충동적인 사람의 성취는 작고, 산발적이고, 일관성이 없습니다.\n지능의 특징(사람을 잠재적으로 이전의 삶의 형태와 구분 짓는 것)은 충동에 맡겨서 행동하기 전에 미래의 결과를 생각하는 능력입니다. 지적 활동은 장거리 목표에 대한 숙고, 이러한 목표에 대한 경로 구성 및 계획, 반대되는 단기간의 충동에도 불구하고 목표 달성을 지속하는 것과 관련됩니다. 지능이 충동 조절과 관련된 개념이라는 것은 성실성 영역의 또 다른 이름인 '신중함'이라는 용어로 잘 알 수 있습니다. 신중한 것은 현명하고 주의를 잘 기울이는 것을 의미합니다. 성실성 척도에서 높은 점수를 받은 사람은 사실 다른 사람들이 지적으로 인식합니다.\n높은 성실성의 이점은 명백합니다. 성실한 개인은 합목적적인 계획과 끈기를 통해 문제를 피하고 높은 수준의 성공을 성취합니다. 그들은 또한 다른 사람들에 의해 지능적이고 신뢰할 수 있는 것으로 여겨집니다. 부정적인 측면에서는, 그들은 완벽 주의자 및 일 중독자 일 수 있습니다. 더욱이, 매우 성실한 개인은 지루하다고 여겨 질 수 있습니다. 성실하지 않은 사람들은 자신의 신뢰도가 낮고 야망이 부족하며 선을 지키지 못해 비난을 받을 수도 있지만, 짧막한 즐거움을 많이 느낄 것이고 지루하다는 말을 들을 일은 없을 겁니다.",
      facets: [
        {
          name: "자기 효능감(Self-Efficacy)",
          description:
            "자기 효능감은 무언가를 성취하는데 있어서 자신의 능력에 대한 자신감을 나타냅니다. 높은 점수를 받는 사람은 성공을 달성하는 데 필요한 정보(상식), 추진력 및 자제력이 있다고 생각합니다. 낮은 득점자는 효과적이지 않으며 자신의 삶을 통제하지 못한다는 느낌을 가질 수 있습니다.",
        },
        {
          name: "질서(Orderliness)",
          description:
            "질서에 대해 높은 점수를 받은 사람은 잘 체계화되어 있습니다. 그들은 규칙과 일정에 따라 생활하기를 좋아합니다. 그들은 목록을 작성하고 계획을 세웁니다. 낮은 득점자는 무계회적이거나 산만한 경향이 있습니다.",
        },
        {
          name: "책임감(Dutifulness)",
          description:
            "이 척도는 사람의 의무감을 반영합니다. 이 척도에서 높은 점수를 받은 사람들은 강한 도덕적 의무감을 갖고 있습니다. 낮은 득점자는 과도하게 제한하는 계약, 규칙 및 규정이라고 생각합니다. 그들은 신뢰할 수 없거나 심지어 무책임한 것으로 보일 수 있습니다.",
        },
        {
          name: "성취 추구(Achievement-Striving)",
          description:
            "이 척도에서 높은 점수를 받은 개인은 탁월함을 얻기 위해 열심히 노력합니다. 성공으로 인식하게 되면 그들은 숭고한 목표를 향한 궤도에 오르게 됩니다. 그들은 종종 삶의 방향성이 강하지만 극단적으로 높은 점수는 편협하고 자신의 일에 사로 잡혀있을 수 있습니다. 낮은 득점자는 최소한의 작업으로 만족하며며, 다른 사람들은 게으르다고 생각할 수도 있습니다.",
        },
        {
          name: "절제(Self-Discipline)",
          description:
            "많은 사람들이 의지력이라고 부르는 절제는 일을 끝마칠 때까지 어렵거나 불쾌한 작업을 지속 할 수 있는 능력을 말합니다. 높은 자제력을 가진 사람들은 방해물이 있으면 일을 시작하고 궤도에 머물러야하는 것을 꺼릴 수 있습니다. 자기 통제력이 낮은 사람들은 미루고 후속 조치가 불량하며 종종 과제를 완료하지 못합니다.",
        },
        {
          name: "신중함(Cautiousness)",
          description:
            "신중함은 행동하기 전에 가능성을 생각하는 기질을 설명합니다. 신중함 척도에서 높은 점수를 받는 사람들은 결정을 내릴 때 시간을 들입니다. 낮은 득점자는 대안에 대한 고려나 결과에 대한 생각을 하지 않고 첫 번째로 떠오르는 것을 말하거나 수행합니다. ",
        },
      ],
    },
    {
      domain: "신경성(Neuroticism)",
      description:
        "프로이트는 원래 정신적 고통, 정서적 고통, 정상적인 삶의 요구에 효과적으로 대처할 능력이 없는 상태를 묘사하기 위해 신경증 이라는 용어를 사용했습니다. 그는 모든 사람들이 신경증의 징후를 보이지만, 고통의 정도와 고통의 구체적인 증상이 다르다고 제안했습니다. 오늘날 신경증은 부정적인 감정을 경험하는 경향을 나타냅니다. 신경증에 대한 점수가 높은 사람은 주로 불안, 분노 또는 우울증과 같은 하나의 특정한 부정적인 감정을 경험할 수 있고 이러한 감정을 여러 번 경험할 수 있습니다. 신경증 적으로 높은 사람은 감정적으로 반응합니다. 그들은 대부분의 사람들에게 영향을 미치지 않는 사건에 정서적으로 반응하며, 그 반응은 통상적인 것보다 더 강렬한 경향이 있습니다. 그들은 평범한 상황을 위협적이라고 해석 할 가능성이 높으며, 좌절감이 절망적으로 느껴질 가능성이 더 큽니다. 그들의 부정적인 감정적 반응은 비정상적으로 오랜 기간 동안 지속되는 경향이 있는데, 이는 종종 그들이 기분이 좋지 않음을 의미합니다. 감정적인 규칙에 있는 이 문제는 명확하게 생각하고, 결정을 내리고, 스트레스에 효과적으로 대처할 수 있는 신경증적 능력을 감소시킬 수 있습니다.\n",
      facets: [
        {
          name: "불안(Anxiety)",
          description:
            '불안한 개인에게는 "싸움 또는 도주" 시스템이 너무 자주 관여하게 됩니다. 따라서 불안이 심한 사람들은 자주 뭔가 위험한 일이 일어날 거라고 느낍니다. 그들은 특정 상황을 두려워하거나 일반적으로 두려워 할 수 있습니다. 그들은 긴장하고 불안감을 느끼고 불안해합니다. 불안이 적은 사람은 일반적으로 냉담하고 두려움이 없습니다.',
        },
        {
          name: "적대감(Anger)",
          description:
            "적대감에서 높은 점수를 얻은 사람은 상황이 나아지지 않을 때 격분합니다. 그들은 공정하게 대우받는 것에 대해 민감하며 속임수를 쓴다고 느끼면 화가 나고 씁쓸합니다. 이 척도는 화를 느끼는 경향을 측정합니다( 그 사람이 짜증과 적대감을 표현 하든 안하든 상관없이 그 사람의 수용성 수준에 달려있습니다). 점수가 낮은 사람은 자주 또는 쉽게 화를 내지 않습니다.",
        },
        {
          name: "우울(Depression)",
          description:
            "이 척도는 슬픔, 낙담, 낙담하는 경향을 측정합니다. 높은 점수를 받은 사람은 에너지가 부족하고 활동을 시작하는데 어렵습니다. 낮은 득점 자들은 우울한 감정에서 자유로운 경향이 있습니다.",
        },
        {
          name: "자의식(Self-Consciousness)",
          description:
            "자의식이 강한 개인은 다른 사람들이 생각하는 것에 민감합니다. 거부와 조롱에 대한 그들의 관심은 그들이 다른 사람들을 수줍어하고 불편하게 느끼게합니다. 그들은 쉽게 당황하고 종종 부끄러움을 느낍니다. 다른 사람들이 비판하거나 자신들을 놀리는 것에 대한 두려움은 과장되고 비현실적이지만, 어색함과 불편함 때문에 이러한 두려움은 스스로 실현 가능한 예언이 될 수 있습니다. 대조적으로 낮은 점수의 사람들은 다른 사람들이 자신을 잘못된 인상을 가지고 판단하거나 보는데 고통 받지 않습니다. 그들은 사회적 상황에서 긴장을 느끼지 않습니다.",
        },
        {
          name: "충동성(Immoderation)",
          description:
            "충동적인 사람은 강한 갈망을 느끼고 이에 저항하는 데 어려움을 겪습니다. 그들은 장기적인 결과보다는 단기적인 쾌락과 보상을 지향하는 경향이 있습니다. 낮은 득점자는 강하고 저항 할 수 없는 갈망을 경험하지 않으며 결과적으로 과도하게 탐닉하지 않습니다. ",
        },
        {
          name: "스트레스 민감성(Vulnerability)",
          description:
            "스트레스 민감성에 대한 높은 점수 를받는 사람은 압박감이나 스트레스를 받을 때 공황, 혼란 및 무력감을 경험합니다. 낮은 점수를 받은 사람들은 스트레스를 받을 때 더 세세하고 자신감 있으며 명확한 사고를합니다.",
        },
      ],
    },
    {
      domain: "개방성(Openness)",
      description:
        "경험에 대한 개방성은 상상력이 풍부하고 창조적인 사람들을 기존의 사람들과 구별하는 인지적 스타일의 차원을 나타냅니다. 열린 사람들은 지적으로 호기심이 많고 예술에 감사하며 아름다움에 민감합니다. 그들은 폐쇄된 사람들과 비교하여 자신의 감정을 더 잘 알고 있습니다. 그들은 개인주의적이고 관습에서 탈피한 방식으로 생각하고 행동하는 경향이 있습니다. 지식인은 일반적으로 경험에 대한 개방성에서 높은 점수를 받습니다. 따라서 이 요소는 문화 또는 지성 이라고도 불립니다. 그렇더라도, 지능은 아마도 경험에 대한 개방성의 최고의 측면으로 간주됩니다. 경험에 대한 개방성에 대한 점수는 표준형 지능 검사와 연간 학습과 관련됩니다.\n개방된 인식 스타일의 또 다른 특징은 구체적인 경험에서 멀리 떨어진 상상과 추상을 사고 할 수 있는 기능입니다. 개인의 특정 지적 능력에 따라 이 상징적 인지는 수학적, 논리적 또는 기하학적 사고, 언어, 음악 작곡이나 연주의 예술적 또는 은유적 사용, 또는 많은 시각적 또는 공연 예술 중 하나의 형태를 취할 수 있습니다. 경험에 대한 개방성이 낮은 점수를 가진 사람들은 좁은 공통 관심사를 갖는 경향이 있습니다. 그들은 복잡하고 모호하며 섬세한 것보다는 평범하고 직설적이 것을 선호합니다. 그들은 예술이나 과학을 의심스럽게 생각할 수도 있습니다. 닫힌 사람들은 참신함보다 친숙함을 선호합니다. 그들은 보수적이고 변화에 저항력이 있습니다.\n개방성은 심리학자에 의해 더 건강 해지거나 더 성숙 해지는 경우가 많으며, 심리학자들은 종종 이를 스스로 경험할 수 있습니다. 그러나 개방적이고 폐쇄된 사고 스타일은 각자 다른 환경에서 유용합니다. 개방된 사람의 지적 양식은 교수에게 도움이 될 수 있지만 연구 결과에 따르면 폐쇄적 사고는 경찰 업무, 판매 및 다양한 서비스 직종에서의 우수한 직무 수행과 관련되어 있음이 나타났습니다.",
      facets: [
        {
          name: "상상(Imagination)",
          description:
            "상상력이 풍부한 사람들에게 현실 세계는 너무 밋밋하고 평범한 경우가 많습니다. 이 척도에서 높은 점수를 받는 사람들은 더 풍부하고 흥미로운 세상을 만드는 방법으로 판타지를 사용합니다. 이 항목에 낮은 점수의 사람들은 환상보다는 사실에 더 중점을 둡니다. ",
        },
        {
          name: "예술적 관심(Artistic Interests)",
          description:
            "이 척도에서 높은 득점 자들은 예술과 자연 모두에서 아름다움을 사랑합니다. 그들은 예술적 자연적 일에 쉽게 관여하고 몰입하게 됩니다. 비록 많은 사람들이 예술적인 훈련을 하거나 재능이 있다고 생각하지만 그것은 사실이 아닙니다. 이 영역의 특징은 자연 및 인공적인 아름다움에 대한 관심 과 감상입니다 . 낮은 득점 자에게는 예술에 대한 심미 감도와 관심이 부족합니다.",
        },
        {
          name: "감성(Emotionality)",
          description:
            "감성 점수가 높은 사람은 자신의 감정에 대한 접근성과 인지력이 뛰어납니다. 낮은 득점자는 자신의 감정을 덜 인식하고 자신의 감정을 공개적으로 표현하지 않는 경향이 있습니다.",
        },
        {
          name: "모험적(Adventurousness)",
          description:
            "모험심에 중점을 둔 고득점 자들은 새로운 활동을 시도하고, 외국 땅으로 여행하며, 다양한 경험을하기를 열망합니다. 그들은 친숙하고 일상적인 반복을 지루해 하고, 평소와 다르다는 이유로 새로운 길을 택할 것입니다. 낮은 득점자는 변화에 대해 불편함을 느끼고 친숙한 일상을 선호합니다.",
        },
        {
          name: "지성(Intellect)",
          description:
            "지성과 예술적 관심은 경험에 대한 개방성에 있어 가장 중요한 두 가지 주요 측면입니다. 지성이 높은 득점자는 아이디어를 가지고 노는 것을 좋아합니다. 그들은 새롭고 특이한 아이디어에 개방되어 있으며 지적 문제를 토론하는 것을 좋아합니다. 그들은 수수께끼, 수수께끼 및 두뇌 고문을 즐깁니다. 지성 점수가 낮은 사람은 생각보다는 사람이나 물건을 선호합니다. 그들은 지적인 활동을 시간 낭비로 간주합니다. 지성은 지능과 동일시해서는 안 됩니다 . 지성는 지적 능력이 아닌 지적인 스타일이지만 지성에서 높은 점수인 사람은 표준화 된 지능 테스트에서 낮은 지성의 점수의 사람보다 보다 약간 높습니다. ",
        },
        {
          name: "자유주의 (Liberalism)",
          description:
            "심리적 자유주의는 권위, 협약 및 전통적 가치에 도전 할 준비가 되어 있음을 나타냅니다. 가장 극단적인 형태에서, 심리적 자유주의는 규칙에 대한 철저한 적대감, 율법 위반자에 대한 동정, 모호함, 혼란 및 무질서의 사랑을 나타낼 수도 있습니다. 심리적 보수 주의자들은 전통에 부합하는 안전과 안정성을 선호합니다. 심리적 자유주의와 보수주의는 정치적 성향과 일치하지 않지만 특정 정당에 대해서 개개인이 편향되는 경향이 있습니다. ",
        },
      ],
    },
  ]);

  const generateRandomStat = () => {
    return Math.floor(Math.random() * Math.floor(100));
  };

  const allocStatsToDomain = () => {
    const domainList = [...domains];
    domainList.forEach((domain, i) => {
      domain.facets.forEach((facet, j) => {
        domainList[i].facets[j]["score"] = generateRandomStat();
      });
    });
    setDomains(domainList);
  };

  const generatePersonality = () => {
    setIsGenerated(true);
    allocStatsToDomain();
  };

  const bigFive = domains.map((item, index) => {
    return <PersonalityDetail key={index} domain={item.domain} facets={item.facets} />;
  });

  return (
    <Fragment>
      <ButtonToAction
        title="버튼을 누르면 새로운 캐릭터 프로필을 만들 수 있습니다"
        buttonText="생성하기"
        onClick={generatePersonality}
        startIcon={<CheckCircleIcon />}
        inputType="button"
      />
      {isGenerated ? (
        <Paper className={classes.contentBox} elevation={3}>
          {bigFive}
        </Paper>
      ) : (
        <div style={{ display: "none" }} />
      )}
    </Fragment>
  );
};

export default CharacterMaker;
