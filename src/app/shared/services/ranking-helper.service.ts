import { Injectable} from '@angular/core';


@Injectable()
export class RankingHelperService
{
    constructor(){}

    public GetJobIconFromId(id : number) : string 
    {
        console.log(id);
        switch(+id)
        {
            case 0: return "../assets/web/icons/JobVagrant.png";
            case 1: return "../assets/web/icons/JobMercenary.png";
            case 2: return "../assets/web/icons/JobAcrobat.png";
            case 3: return "../assets/web/icons/JobAssist.png";
            case 4: return "../assets/web/icons/JobMagician.png";

            case 6: return "../assets/web/icons/JobKnight.png";
            case 7: return "../assets/web/icons/JobBlade.png";
            case 8: return "../assets/web/icons/JobJester.png";
            case 9: return "../assets/web/icons/JobRanger.png";
            case 10: return "../assets/web/icons/JobRingmaster.png";
            case 11: return "../assets/web/icons/JobBillposter.png";
            case 12: return "../assets/web/icons/JobPsychikeeper.png";
            case 13: return "../assets/web/icons/JobElementor.png";

            case 16: return "../assets/web/icons/JobKnightMaster.png";
            case 17: return "../assets/web/icons/JobBladeMaster.png";
            case 18: return "../assets/web/icons/JobJesterMaster.png";
            case 19: return "../assets/web/icons/JobRangerMaster.png";
            case 20: return "../assets/web/icons/JobRingmasterMaster.png";
            case 21: return "../assets/web/icons/JobBillposterMaster.png";
            case 22: return "../assets/web/icons/JobPsychikeeperMaster.png";
            case 23: return "../assets/web/icons/JobElementorMaster.png";

            case 24: return "../assets/web/icons/JobKnightHero.png";
            case 25: return "../assets/web/icons/JobBladeHero.png";
            case 26: return "../assets/web/icons/JobJesterHero.png";
            case 27: return "../assets/web/icons/JobRangerHero.png";
            case 28: return "../assets/web/icons/JobRingmasterHero.png";
            case 29: return "../assets/web/icons/JobBillposterHero.png";
            case 30: return "../assets/web/icons/JobPsychikeeperHero.png";
            case 31: return "../assets/web/icons/JobElementorHero.png";

            case 32: return "../assets/web/icons/JobLordtemplerHero.png";
            case 33: return "../assets/web/icons/JobStormbladeHero.png";
            case 34: return "../assets/web/icons/JobWindlurkerHero.png";
            case 35: return "../assets/web/icons/JobCrackshooterHero.png";
            case 36: return "../assets/web/icons/JobFloristHero.png";
            case 37: return "../assets/web/icons/JobForcemasterHero.png";
            case 38: return "../assets/web/icons/JobMentalistHero.png";
            case 39: return "../assets/web/icons/JobElementorlordHero.png";

            default: return "../assets/web/icons/JobVagrant.png";
        }
    }

    public GetJobNameFromId(id : number) : string
    {
        switch(+id)
        {
            case 0: return "Vagrant";
            case 1: return "Mercanery";
            case 2: return "Acrobat";
            case 3: return "Assist";
            case 4: return "Magician";

            case 6: 
            case 16: 
            case 24: return "Knight";
            case 7: 
            case 17: 
            case 25: return "Blade";
            case 8: 
            case 18: 
            case 26: return "Jester";
            case 9: 
            case 19: 
            case 27: return "Ranger";
            case 10: 
            case 20: 
            case 28: return "Ringmaster";
            case 11: 
            case 21: 
            case 29: return "Billposter";
            case 12: 
            case 22: 
            case 30: return "Psykeeper";
            case 13: 
            case 23: 
            case 31: return "Elementor";

            case 32: return "Templar";
            case 33: return "Slayer";
            case 34: return "Harlequin";
            case 35: return "Crackshooter";
            case 36: return "Seraph";
            case 37: return "Force Master";
            case 38: return "Mentalist";
            case 39: return "Arcanist";

            default: return "Vagrant";
        }
    }

    public GetLevelIconFromJobAndLevel(job: number, level: number) : string
    {
        if(job > 13 && job < 24)
        {
            if(level >= 110) return "../assets/web/icons/Icon_MasterMark6.png";
            if(level >= 100) return "../assets/web/icons/Icon_MasterMark5.png";
            if(level >= 90) return "../assets/web/icons/Icon_MasterMark4.png";
            if(level >= 80) return "../assets/web/icons/Icon_MasterMark3.png";
            if(level >= 70) return "../assets/web/icons/Icon_MasterMark2.png";
            if(level >= 60) return "../assets/web/icons/Icon_MasterMark1.png";
        }

        if(level > 120) return "../assets/web/icons/icon_Hero.png";

        return "";
    }
}