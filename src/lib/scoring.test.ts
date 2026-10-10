import { describe, expect, it } from 'vitest';
import { alignmentWeights, alignmentScore, evolvedScore } from './demo-data';
describe('Brief scoring rules',()=>{
 it('uses the seven specified alignment weights',()=>{expect(alignmentWeights).toEqual({clinicalOutcomes:5,practiceCharacteristics:10,scientificExchange:10,patientBurden:20,treatmentExperience:20,scientificLeadership:15,otherStrategicFactors:20});});
 it('applies percentage weights to alignment inputs',()=>{expect(alignmentScore({clinicalOutcomes:100,practiceCharacteristics:0,scientificExchange:0,patientBurden:0,treatmentExperience:0,scientificLeadership:0,otherStrategicFactors:0})).toBe(5);});
 it('evolves the example score from 5 to 10',()=>{expect(evolvedScore(5,{msl:3,publications:2,advisory:1,mentions:4})).toBe(10);});
});
