import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ESuggestion,
  faceFormType1,
  faceFormType2,
  glassFormType1,
  glassFormType2,
  matType1,
  matType2,
  totalWeight,
  weight,
} from 'src/common/constants';
import { Eyewear } from 'src/eyewear/entity/eyewear.entity';
import { Repository } from 'typeorm';
import { SuggestionDto } from './dto/suggestion.dto';
import { Suggestion } from './entity/suggestion.entity';
import { SuggestionForm } from './entity/suggestionForm.entity';

@Injectable()
export class SuggestionService {
  constructor(
    @InjectRepository(SuggestionForm)
    private readonly suggestionFormRepository: Repository<SuggestionForm>,
    @InjectRepository(Suggestion)
    private readonly suggestionRepository: Repository<Suggestion>,
    @InjectRepository(Eyewear)
    private readonly eyewearRepository: Repository<Eyewear>,
  ) {}

  async getSuggestionForm() {
    const res = await this.suggestionFormRepository.find();
    const formStep1 = res.filter((item) => item.step === 1);
    const formStep2 = res.filter((item) => item.step === 2);
    const formStep3 = res.filter((item) => item.step === 3);
    const formStep4 = res.filter((item) => item.step === 4);
    const formStep5 = res.filter((item) => item.step === 5);
    const form = {
      formStep1,
      formStep2,
      formStep3,
      formStep4,
      formStep5,
    };
    return form;
  }

  async postSuggestionForm(body: SuggestionDto) {
    const listSuggestion = await this.suggestionRepository.find();
    const result = [];

    listSuggestion.forEach((item) => {
      let similarity =
        weight.age * this.calDistance(body.age, item.age) +
        weight.gender * this.calDistance(body.gender, item.gender) +
        weight.faceForm *
          this.calDistanceByType(
            body.faceForm,
            [item.faceForm],
            ESuggestion.faceForm,
          ) +
        weight.glassForm *
          this.calDistanceForm(
            body.glassForm,
            item.glassForm,
            ESuggestion.glassForm,
          ) +
        weight.material *
          this.calDistanceForm(
            body.material,
            item.material,
            ESuggestion.material,
          );

      similarity /= totalWeight;
      result.push({ similarity, suggestion: item.suggestion });
    });

    result.sort(function (a, b) {
      return b.similarity - a.similarity;
    });

    if (result.length > 5) result.length = 5;
    const ids = result.map((item) => item.suggestion);
    return await this.getProductsById(ids);
  }

  async getProductsById(ids: string[]) {
    const newIds = ids
      .map((item) => this.convertStringToNumberArray(item))
      .reduce((acc, key) => {
        return [...acc, ...key];
      });

    const uniqueArray = newIds.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    });

    const result = await Promise.all(
      uniqueArray.map(async (item) => {
        const product = await this.eyewearRepository.findOne({
          relations: {
            brand: true,
            type: true,
            colorCollection: true,
            imageCollection: true,
          },
          where: {
            id: item,
          },
        });
        return product;
      }),
    );
    return result;
  }

  calDistance(problemValue: number, caseValue: number) {
    if (problemValue === caseValue) return 1;
    return 0;
  }

  calDistanceByType(problemValue: number, caseValues: number[], type: string) {
    let typeValues1 = [];
    let typeValues2 = [];
    switch (type) {
      case ESuggestion.faceForm:
        typeValues1 = faceFormType1;
        typeValues2 = faceFormType2;
        break;
      case ESuggestion.glassForm:
        typeValues1 = glassFormType1;
        typeValues2 = glassFormType2;
        break;
      case ESuggestion.material:
        typeValues1 = matType1;
        typeValues2 = matType2;
        break;
    }
    if (caseValues.includes(problemValue)) return 1;
    if (
      (typeValues1.includes(problemValue) &&
        this.checkHasValueInSameType(caseValues, typeValues1)) ||
      (typeValues2.includes(problemValue) &&
        this.checkHasValueInSameType(caseValues, typeValues2))
    )
      return 0.5;
    return 0;
  }

  calDistanceForm(problemValue: number[], caseValue: string, type: string) {
    const convertCaseValue = this.convertStringToNumberArray(caseValue);
    const res = [];
    problemValue.forEach((item) => {
      res.push(this.calDistanceByType(item, convertCaseValue, type));
    });
    const distance = res.reduce((acc, key) => acc + key) / res.length;
    return distance;
  }

  convertStringToNumberArray(values: string) {
    const temp = values.split(',');
    const numberArray = temp.map((item) => +item);
    return numberArray;
  }

  checkHasValueInSameType(caseValues: number[], typeValues: number[]) {
    let check = false;
    caseValues.forEach((item) => {
      if (typeValues.includes(item)) check = true;
    });
    return check;
  }
}
