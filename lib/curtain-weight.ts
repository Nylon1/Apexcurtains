export type CurtainWeightInputs = {
  width: number;
  drop: number;
  fullness: number;
  fabric: number;
  lining: number;
  allowance: number;
};

export function estimateCurtainWeight({ width, drop, fullness, fabric, lining, allowance }: CurtainWeightInputs) {
  const area = width * drop * fullness;
  const fabricMass = area * fabric * (1 + allowance / 100) / 1000;
  const liningMass = area * lining * (1 + allowance / 100) / 1000;
  return { area, fabricMass, liningMass, total: fabricMass + liningMass };
}
