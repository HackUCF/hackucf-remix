import type { MetaFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const CONSTITUTION_ARTICLES = [
  {
    id: 'article-1',
    title: 'Article I—Collegiate Cyber Defense Club',
    content:
      'The name of this organization shall be Collegiate Cyber Defense Club. The organization may also refer to itself as CCDC.',
  },
  {
    id: 'article-2',
    title: 'Article II—Mission and Goals',
    content: [
      {
        id: 'article-2-section-1',
        subtitle: 'Section 1: Mission',
        text: 'The mission of Collegiate Cyber Defense Club is to establish a Computer Security community within the university, to provide a venue for students to improve their computer security skills, and to foster a spirit of ethics with the training we provide. This club will participate in a variety of collegiate, national, and international cyber security competitions. Through all of this we hope to produce a security aware generation in Central Florida.',
      },
      {
        id: 'article-2-section-2',
        subtitle: 'Section 2: Goals',
        text: 'With our community growing, we want to provide an outlet to gain new skills and share information. We plan to start within UCF, but our outreach can include anyone, anywhere. We hope to share our knowledge and skills with all that seek to learn.',
      },
      {
        id: 'article-2-section-3',
        subtitle: 'Section 3: Governing Authority',
        text: 'All activities and functions of the organization must be legal under University, local, state, and federal laws. The most recent version of the Golden Rule will supersede all requirements set forth during the creation and revision of this constitution. In addition, the most recent version of Robert\'s Rules of Order shall be the authority over those questions which have not been specified by university regulations or this constitution. Within this constitution, a majority shall be defined as "more than 50%."',
      },
    ],
  },
  {
    id: 'article-3',
    title: 'Article III—Membership',
    content: [
      {
        id: 'article-3-section-1',
        subtitle: 'Section 1: Membership Statement',
        text: 'Membership in this organization is limited to any student who is paying Activity and Service Fees and is currently and/or continuously enrolled at the University of Central Florida. No discrimination shall be made on the basis of race, color, religion, sex, national origin, age, disability, marital status, sexual orientation, gender identity, gender expression, or veteran status. Hazing will not be allowed as a condition of membership in this organization.',
      },
      {
        id: 'article-3-section-2',
        subtitle: 'Section 2: Additional Membership Requirements',
        text: 'Members must pay dues as per Article IX; Members must attend 50% of membership meetings within the current semester. Members must answer a call to quorum for any meeting given at least one week of notice else they temporarily forgo their "active student member" status for the purposes of voting at said meeting. Together with Article III, Section 1, these additional requirements define what it means to be an "active student member."',
      },
      {
        id: 'article-3-section-3',
        subtitle: 'Section 3: Recruitment',
        text: 'Recruitment shall take place throughout the year and membership is open at all times.',
      },
      {
        id: 'article-3-section-4',
        subtitle: 'Section 4: Voting Rights',
        text: 'Only active student members are eligible to vote.',
      },
      {
        id: 'article-3-section-5',
        subtitle: 'Section 5: Revocation of Membership',
        text: 'Membership may be revoked without mutual agreement for non-participation, misconduct, or violations of any provisions of the Constitution. The member will be notified in writing of the possible revocation at least 72 hours prior to the vote and will be allowed to address the organization in order to relate to members any relevant defense prior to the voting for removal. Membership can only be revoked upon a 2/3 affirmative vote of active student members.',
      },
      {
        id: 'article-3-section-6',
        subtitle: 'Section 6: Reinstatement of Membership',
        text: 'Membership may be reinstated after one full semester has passed. The former member may submit a request for reinstatement to the President. At the next membership meeting, the organization must vote on the reinstatement request. Membership may be reinstated by a 2/3 affirmative vote by active student members.',
      },
    ],
  },
  {
    id: 'article-4',
    title: 'Article IV—Officers',
    content: [
      {
        id: 'article-4-section-1',
        subtitle: 'Section 1: Eligibility',
        text: 'Potential officers must meet the minimum eligibility requirements of active student membership (Article III, Sections 1 and 2). All officers of the organization shall possess (at the time of election and during their term) at least the minimum requirements regarding enrollment hours, GPA, academic and disciplinary standing, and financial and disciplinary holds to serve in a leadership position, as stated in the most recent version of the Golden Rule of the University of Central Florida. Officers who do not meet these requirements during their term shall be resigned or removed.',
      },
      {
        id: 'article-4-section-2',
        subtitle: 'Section 2: Additional Eligibility Criteria',
        text: 'Potential officers must have been active student members for at least two consecutive semesters, including the semester of their nomination and election. The requirements of this section may be waived by a 2/3 affirmative vote of active student members, prior to nominations and elections. Potential officers must agree to abide by the mission and purpose of the organization, as stated in Article II, Sections 1 and 2. The requirements of this section may be waived by a 2/3 affirmative vote of active student members, prior to nominations and elections.',
      },
      {
        id: 'article-4-section-3',
        subtitle: 'Section 3: Officer Requirements',
        text: 'Officers must attend 75% of all officer meetings, membership meetings, and events unless they have an excused absence. Absences can be expunged by a 2/3 affirmative vote of officers.',
      },
      {
        id: 'article-4-section-4',
        subtitle: 'Section 4: Titles and Duties',
        text: "The officers of this organization shall include a President, Vice President, Treasurer, and Secretary. No officer will be permitted to hold more than one officer position at a time, unless appointed to an interim position as per Article VI, Section 3.\n\nThe President shall:\n\n• Supervise and coordinate the activities of the organization.\n\n• Preside over all meetings and call all meetings to order.\n\n• Maintain communication with the Office of Student Involvement and ensure that all paperwork is current.\n\n• Be one of three signers on financial documents.\n\n• Be responsible for creating a budget at the beginning of each fall and spring semester, in conjunction with the Treasurer.\n\n• Ensure that all officers are familiar with this Constitution, via a review to happen within one month of officer installation.\n\n• Ensure that all officers are performing their duties as defined in this Constitution.\n\n• Keep the advisor informed of activities and functions of the organization.\n\n• Be familiar with Robert's Rules of Order to conduct meetings.\n\n• Be familiar with the Golden Rule regulations as they relate to student organizations and communicate them to the organization as needed.\n\n• Provide all documents and records pertaining to their responsibilities to the newly-elected President.\n\n• Assign special projects to officers.\n\nThe Vice President shall:\n\n• Assist the President in their duties.\n\n• Assume the President's responsibilities in their absence.\n\n• Coordinate all conferences.\n\n• Keep accurate records of all meetings in the Secretary's absence.\n\n• Plan and be responsible for all retreats and training of the organization.\n\n• Perform an audit of all financial transactions of the organization once per semester.\n\n• Provide all documents and records pertaining to their responsibilities to the newly-elected Vice President.\n\n• Assist in special projects as assigned by the President.\n\nThe Treasurer shall:\n\n• Keep an accurate account of all funds received and expended.\n\n• Present a budget report of deposits and expenditures to the membership at least once per month, and as requested by the President, Vice President, advisor, or Office of Student Involvement.\n\n• Be one of three signers on financial documents.\n\n• Be responsible for collecting dues and notifying members who are delinquent in their payments.\n\n• Be responsible for creating a budget at the beginning of each fall and spring semester, in conjunction with the President.\n\n• Provide financial records sufficient to allow the Vice President to perform audits.\n\n• Provide all documents and records pertaining to their responsibilities to the newly-elected Treasurer.\n\n• Assist in special projects as assigned by the President.\n\nThe Secretary shall:\n\n• Notify members of meetings via e-mail and/or telephone at least 48 hours in advance.\n\n• Keep accurate minutes and records of all meetings.\n\n• Maintain an accurate list of members and their contact information.\n\n• Prepare the organization's Update Form to submit to OSI at the beginning of each semester, and when there are changes in organizational information over the course of the semester.\n\n• Take attendance at all meetings and maintain an attendance record.\n\n• Prepare ballots for elections.\n\n• Check eligibility for potential officers, prior to annual elections.\n\n• Keep a copy of the constitution and have it available for members.\n\n• Provide all documents and records pertaining to their responsibilities to the newly-elected Secretary.\n\n• Assist in special projects as assigned by the President.",
      },
      {
        id: 'article-4-section-5',
        subtitle: 'Section 5: Voting Rights',
        text: 'All officers shall retain voting rights; however, the President shall only vote in the case of a tie, with the exception of officer elections.',
      },
      {
        id: 'article-4-section-6',
        subtitle: 'Section 6: Term of Office',
        text: 'The length of term of office shall be no longer than one year.',
      },
    ],
  },
  {
    id: 'article-5',
    title: 'Article V—Selection of Officers',
    content: [
      {
        id: 'article-5-section-1',
        subtitle: 'Section 1: Announcement of Elections',
        text: 'The President shall, at least one meeting prior, announce the date of the upcoming nominations and elections. They shall also state the eligibility criteria (as defined in Article IV, Sections 1 and 2) and that all active student members interested in running for an office should bring written proof of eligibility to the nominations/elections meeting.',
      },
      {
        id: 'article-5-section-2',
        subtitle: 'Section 2: Nomination Process',
        text: 'The nomination of officers shall occur each academic year at the membership meeting held in March. One of the officers not running for office (preference determined by the order listed in Article IV, starting with the President) shall facilitate the nomination and election process at this meeting. If this is not possible, the facilitator will be selected by a majority vote of active student members.\n\nNomination procedures:\n\n• Any active student member present may nominate someone or themselves for office by verbally nominating the individual during this procedure.\n\n• The nominee must be considered eligible for an officer position (as defined in Article IV, Sections 1 and 2) as verified by the Secretary.\n\n• Absentee/proxy ballots are not permitted in the nomination process.',
      },
      {
        id: 'article-5-section-3',
        subtitle: 'Section 3: Election Process',
        text: 'The election of officers shall occur at the membership meeting held in April. The order of elections shall be: President, Vice President, Treasurer, and Secretary. The organization may not proceed to the election of the next officer until the current one has been resolved.\n\nCandidate presentations:\n\n• The nominated candidates for each office will be given a chance to address the organization to discuss their qualifications and reasons why they should be selected to that office.\n\n• Candidates will speak to the organization in alphabetical order by last name.\n\nVoting process:\n\n• Once each candidate for that office has had the opportunity to speak, all active student members present (minus the nominations/elections facilitator described in Section 1 above) will have the opportunity to vote by secret ballot.\n\n• Absentee/proxy ballots are not permitted in the election process.\n\nVote tabulation:\n\n• The nominations/elections facilitator will tabulate all votes immediately, in the presence of the organization.\n\n• A candidate shall be elected by a majority of all votes cast by active student members.\n\n• If no candidate receives a majority of votes, the top two candidates will immediately enter into a run-off election.\n\n• In the event of a tie, the nominations/elections facilitator shall cast a vote to break the tie.\n\nResults and confirmation:\n\n• The nominations/elections facilitator will announce the new officer and ask if any active student member contests the count.\n\n• If no active student member contests the count, the new officer shall take office as per Article V, Section 4.\n\n• If an active student member contests the count, each candidate may select an active student member to supervise the recount.\n\n• The nominations/elections facilitator will immediately recount all votes in the presence of the selected representatives.\n\n• Once an officer is confirmed, the organization will proceed to elections for the next officer.',
      },
      {
        id: 'article-5-section-4',
        subtitle: 'Section 4: Installation of Officers',
        text: 'Newly elected officers shall take office immediately following the membership meeting in April and their term will end immediately following the membership meeting the next April. Current officers should assist in the transition and training of the officers-elect, from elections until installation. A change in officer information should be reported to the Office of Student Involvement, via Update Form, within 10 school days of installation.',
      },
      {
        id: 'article-5-section-5',
        subtitle: 'Section 5: Re-election',
        text: 'Any officer may be re-elected; however, not for more than two consecutive terms in the same officer position. Officers cannot reappoint themselves for a subsequent term, they must be re-elected as described in Article V.',
      },
    ],
  },
  {
    id: 'article-6',
    title: 'Article VI—Officer Vacancies',
    content: [
      {
        id: 'article-6-section-1',
        subtitle: 'Section 1: Removal of Officers',
        text: 'Leadership may be revoked without mutual agreement for non-participation, misconduct, failure to fulfill job duties, or violations of any provisions of the Constitution. The officer will be notified in writing of the possible removal from office at least 72 hours prior to the vote and will be allowed to address the organization in order to relate to members any relevant defense prior to the voting for removal. Any officer may be removed from office upon a 2/3 affirmative vote of active student members. The removed officer shall provide all documents relating to the organization and brief their replacement of current projects in their care.',
      },
      {
        id: 'article-6-section-2',
        subtitle: 'Section 2: Resignation',
        text: "Officers no longer wishing to serve on the board must submit their resignation to the President (or Vice President if the President is resigning) and advisor at least two (2) weeks in advance. Prior to the officer's final day they shall provide all documents relating to the organization and brief their replacement of current projects in their care.",
      },
      {
        id: 'article-6-section-3',
        subtitle: 'Section 3: Filling Vacant Officer Positions',
        text: "Procedures for filling vacant positions:\n\nFor non-presidential vacancies:\n• In the event an officer (besides President) is removed or resigns, the remaining officers will decide if the position is to be filled.\n• If it is to be filled, the nomination and election process as stated in Article V will take place at the next membership meeting.\n• The officers may appoint an interim officer to serve in the vacant position until the next membership meeting.\n\nFor presidential vacancies:\n• If the President is removed or resigns, the Vice President will assume the role of President upon a majority confirmation of the remaining officers.\n• If not confirmed, the position of the President will be filled as per the process for non-presidential vacancies.\n\nTerm limits and reporting:\n• Each newly elected officer's term shall end at the annual installation of officers in April.\n• A change in officer information should be reported to the Office of Student Involvement, via Update Form, within 10 school days of the election.",
      },
    ],
  },
  {
    id: 'article-7',
    title: 'Article VII—Meetings and Events',
    content: [
      {
        id: 'article-7-section-1',
        subtitle: 'Section 1: Membership Meetings',
        text: "The membership should meet at least twice per month during the fall and spring semesters. Meetings are open to those defined in Article III, Section 1, and officers (except the President, unless otherwise stated) and active student members (unless otherwise stated) are allowed one vote per motion. The quorum required to conduct business is a majority of the officers and organization's active student members. Unless otherwise stated in this constitution, a motion is considered passed with a majority vote.",
      },
      {
        id: 'article-7-section-2',
        subtitle: 'Section 2: Officer Meetings',
        text: 'The officers should meet at least twice per month during the fall and spring semesters. Meetings are open to those defined in Article III, Section 1, and officers (except the President, unless otherwise stated) are allowed one vote per motion. The quorum required to conduct business is a majority of the officers. Unless otherwise stated in this constitution, a motion is considered passed with a majority vote.',
      },
      {
        id: 'article-7-section-3',
        subtitle: 'Section 3: Calling Meetings',
        text: 'The President will be in charge of calling meetings and the Secretary will be responsible for notifying all members and/or officers at least 48 hours in advance, by e-mail and/or telephone. A majority vote of the officers or active student members may also call a meeting.',
      },
      {
        id: 'article-7-section-4',
        subtitle: 'Section 4: Meeting Procedure',
        text: "The President shall use their discretion as to the manner and process in which they preside over meetings. However, the President shall follow Robert's Rules of Order in a given meeting if 2/3 of the active student members so request.",
      },
      {
        id: 'article-7-section-5',
        subtitle: 'Section 5: Events',
        text: 'Events shall be held periodically during the fall and spring semesters. Events are open to those defined in Article III, Section 1. The President will be in charge of calling events and the Secretary will be responsible for notifying all members at least 48 hours in advance, by e-mail and/or telephone.',
      },
    ],
  },
  {
    id: 'article-8',
    title: 'Article VIII—Advisor',
    content: [
      {
        id: 'article-8-section-1',
        subtitle: 'Section 1: Selection',
        text: 'The advisor shall be selected by the officers. To be eligible to serve as the advisor, the person must be a contracted UCF employee (faculty or A&P), as defined by Human Resources.',
      },
      {
        id: 'article-8-section-2',
        subtitle: 'Section 2: Role and Authority',
        text: 'The advisor shall serve as a mentor to the organization, providing guidance to the officers and members in the development and implementation of programs and activities, as well as UCF policy and procedure. Additionally, the advisor will monitor expenditures of the organization. The advisor has no voting rights. The advisor must be willing to obtain an appropriate level of experience, resource information, and knowledge related to the mission, purpose, and activities of the organization.',
      },
      {
        id: 'article-8-section-3',
        subtitle: 'Section 3: Length of Term',
        text: 'The advisor has no term limit as long as they remain a contracted UCF employee.',
      },
      {
        id: 'article-8-section-4',
        subtitle: 'Section 4: Removal and Replacement of Advisor',
        text: 'The advisor will be notified in writing of the possible removal at least 72 hours prior to the vote and will be allowed to address the organization in order to relate to members any relevant defense prior to the voting for removal. Upon a majority vote of active student members, the advisor will be removed from their duties. In the event that an advisor is removed or resigns, a new advisor shall be elected within 15 school days. A change in advisor information should be immediately reported to the Office of Student Involvement, via Update Form.',
      },
    ],
  },
  {
    id: 'article-9',
    title: 'Article IX—Finances',
    content: [
      {
        id: 'article-9-section-1',
        subtitle: 'Section 1: Membership Dues',
        text: 'Membership dues shall be $10 per year. Membership dues will be collected by the Treasurer during the fall and spring semesters only. All active student members, including officers, are required to pay membership dues. Full or partial refunds can only be granted upon a 2/3 affirmative vote of the officers.',
      },
      {
        id: 'article-9-section-2',
        subtitle: 'Section 2: Budget Approval',
        text: 'The Treasurer (in conjunction with the President) shall create a budget for the fall and spring semesters. The officers and active student members must approve the budget within the first month of each semester. New expenditures, above $30, not approved in the semester budget must be approved by a vote of the active student members.',
      },
      {
        id: 'article-9-section-3',
        subtitle: 'Section 3: Financial Authority',
        text: "For the protection of the organization and its officers, it is required that two authorized persons approve all monetary transactions. Only the President, Treasurer, and Advisor can be signers with the organization's financial institution. Organizational funds may be spent on items such as office supplies, events and activities, publicity, travel expenses, and conference fees, but will not be used for anything illegal under University, local, state, and federal laws. All funds must be deposited within 24 business hours after collection.",
      },
      {
        id: 'article-9-section-4',
        subtitle: 'Section 4: Officer Transition',
        text: "It shall be the responsibility of all account signers to change contact information, as well as assist in the update of new account signatures with the organization's financial institution after each election. In addition, it is the outgoing Treasurer's responsibility to compile and present all banking documents and information about the previous and current budget to the new Treasurer.",
      },
      {
        id: 'article-9-section-5',
        subtitle: 'Section 5: Dissolution of Organization',
        text: "In the event that the organization ceases to exist, any funds remaining in the organization's account shall be donated to: Electronic Frontier Foundation, 815 Eddy Street, San Francisco, CA 94109 USA, Phone: +1-415-436-9333, Fax: +1-415-436-9993",
      },
    ],
  },
  {
    id: 'article-10',
    title: 'Article X—External Affiliations',
    content:
      'Electronic Frontier Foundation: The rules and regulations of the external affiliate shall be followed when not inconsistent with the rules and regulations of this Constitution and University of Central Florida.',
  },
  {
    id: 'article-11',
    title: 'Article XI—Committees',
    content:
      'Committees may be formed by a vote of officers or active student members. At the time of formation, the process for committee member selection, chair selection, committee and chair responsibilities must also be approved. Committees may be dissolved by a vote of officers or active student members.',
  },
  {
    id: 'article-12',
    title: 'Article XII—Publications and Advertising',
    content: [
      {
        id: 'article-12-section-1',
        subtitle: 'Section 1: Compliance',
        text: 'All graphics and publicity of the organization must comply with the Golden Rule, Event Policies, Student Union and other building guidelines, and the UCF University Marketing Graphic Standards.',
      },
      {
        id: 'article-12-section-2',
        subtitle: 'Section 2: Approval',
        text: 'The Secretary and President must unanimously approve all graphics and publicity (e.g., shirts, flyers, and other forms of advertising/marketing) prior to duplication and distribution.',
      },
    ],
  },
  {
    id: 'article-13',
    title: 'Article XIII—Ratification and Empowerment',
    content: [
      {
        id: 'article-13-section-1',
        subtitle: 'Section 1: Ratification',
        text: 'This constitution will become ratified by a 2/3 approval of the officers of the organization.',
      },
      {
        id: 'article-13-section-2',
        subtitle: 'Section 2: Empowerment',
        text: 'This constitution will take effect only after it is approved by the Student Government Association and Office of Student Involvement.',
      },
    ],
  },
  {
    id: 'article-14',
    title: 'Article XIV—Risk Management',
    content: [
      {
        id: 'article-14-section-1',
        subtitle: 'Section 1: General',
        text: 'The organization will follow all risk management guidelines and procedures as provided by the Office of Student Involvement or other university entities, in regards to organizational activities, event planning, and group travel. Additionally, officers of the organization will continually review organizational procedures in an attempt to minimize any potential risks.',
      },
    ],
  },
  {
    id: 'article-15',
    title: 'Article XV—Amendments',
    content:
      'Amendments to the constitution must be proposed in writing to the President. The amendment must then be presented to the organization during a membership meeting and should include a full explanation and/or rationale for the amendment. The amendment must be voted on at the following membership meeting and approved by a 2/3 affirmative vote of active student members. All amended constitutions must be submitted to the Office of Student Involvement within two school weeks. The amendment shall not take effect until approved by the Office of Student Involvement.',
  },
];

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap(match => match.meta ?? []);

  const routeMeta = [
    { title: 'Constitution | Hack@UCF' },
    {
      name: 'description',
      content:
        'Official constitution of the Collegiate Cyber Defense Club (CCDC) at UCF, outlining our mission, membership requirements, organizational structure, and governing principles. Established in 2012, we focus on computer security education, ethical training, and fostering a cybersecurity community within Central Florida.',
    },
  ];

  return [...parentMeta, ...routeMeta];
};

export default function Constitution() {
  return (
    <main className="min-h-screen p-8 bg-background text-foreground pt-28">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-16 mt-8">
          <h1 className="text-5xl font-bold">
            Constitution of Collegiate Cyber Defense Club
          </h1>
          <Link
            to="/about-us"
            className="text-center border-2 bg-background hover:bg-brandGold text-lg hover:text-background border-brandGold text-brandGold rounded-full w-full mt-16 py-1"
          >
            Back to About Us
          </Link>
        </div>
        <p className="mb-12 text-xl">
          This document outlines the governing principles and operational
          procedures of the Collegiate Cyber Defense Club.
        </p>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {CONSTITUTION_ARTICLES.map(article => (
            <AccordionItem
              key={article.id}
              value={article.id}
              className="border border-brandGold rounded-lg my-4"
            >
              <AccordionTrigger className="px-4 py-2 hover:bg-brandGold hover:text-background rounded-md transition-colors">
                {article.title}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2">
                {Array.isArray(article.content) ? (
                  article.content.map(section => (
                    <div key={section.id} className="mb-4">
                      <h3 className="text-lg font-semibold text-brandGold mb-2">
                        {section.subtitle}
                      </h3>
                      {section.text.includes('•') ? (
                        <div>
                          {section.text.split('\n\n').map((paragraph, i) => (
                            <div
                              key={`${section.id}-paragraph-${i}`}
                              className="mb-2"
                            >
                              {paragraph.startsWith('•') ? (
                                <ul className="list-disc pl-5 space-y-2">
                                  {paragraph.split('\n').map(item => (
                                    <li
                                      key={`${section.id}-${item.substring(
                                        0,
                                        20,
                                      )}`}
                                      className="pl-1"
                                    >
                                      {item.replace('• ', '')}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p>{paragraph}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>{section.text}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>{article.content}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-brandGold">
            History of Constitution:
          </h2>
          <ul className="list-disc list-inside">
            <li>Created: 29 Oct 2012</li>
            <li>Previously Revised: 20 Aug 2013</li>
            <li>Revised: 30 Apr 2020</li>
          </ul>
        </div>

        <div className="mt-8">
          <Link
            to="/about"
            className="text-brandGold hover:underline"
            prefetch="intent"
          >
            Back to About Us
          </Link>
        </div>
      </div>
    </main>
  );
}
