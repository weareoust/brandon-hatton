import tw from "tailwind.macro"

const Section = tw.section`border-black border-solid border-0 border-b-2 flex flex-col md:flex-row`
const Col = tw.div`md:w-1/2 px-4 md:px-8 py-12`
const TitleCol = tw(Col)`border-0 border-black border-solid border-b-2 md:border-b-0 md:border-r-2 pt-12 pb-0 md:pb-12 px-0 mx-4 md:mx-8 md:px-8 md:mx-0`
const SnglCol = tw(Col)`md:w-full py-24 flex flex-col items-center text-center`

export {
  Section,
  Col,
  TitleCol,
  SnglCol
}
