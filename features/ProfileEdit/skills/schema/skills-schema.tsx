export interface AddSkillSchema {
  skills: Array<{
    name: string;
    level: string;
  }>;
}

export interface EditSkillSchema {
  skills: Array<{
    name: string;
    level: string;
  }>;
  pendingSkills: Array<{
    name: string;
    level: string;
  }>;
}

export interface Skills {
  skills: Array<{
    name: string;
    level: string;
  }>;
}

export interface pendingSkills {
  pendingSkills: Array<{
    name: string;
    level: string;
  }>;
}
