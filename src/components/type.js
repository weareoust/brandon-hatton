import tw from "tailwind.macro"

const Heading = tw.h1`font-heading text-2xl md:text-5xl mt-0`
const Body = tw.p`font-body text-lg tracking-wide`
const Label = tw.label`
  font-body mb-2
`;
const Field = tw.input`
  font-body border-0 p-2 mb-2 rounded-sm 
`;
const Btn = tw.button`
	m-0 uppercase tracking-wide font-heading text-tertiary bg-primary p-4 inline-block no-underline border-black
`;

export {
  Heading,
  Body,
  Label,
  Field,
  Btn
}
