// Simple in-memory database for development
const bcrypt = require('bcryptjs');

class InMemoryDB {
  constructor() {
    this.users = [];
    this.courses = [];
    this.userProgress = [];
    this.certificates = [];
    this.init();
  }

  async init() {
    // Initialize with demo data
    const hashedPassword = await bcrypt.hash('password', 10);
    
    // Create demo users
    this.users = [
      {
        _id: 'admin1',
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date()
      },
      {
        _id: 'student1',
        name: 'Arden Student',
        email: 'student@example.com',
        password: hashedPassword,
        role: 'student',
        createdAt: new Date()
      }
    ];

    // Create demo courses
    this.courses = [
      {
        _id: 'course1',
        title: 'GDPR Training Course (SME Edition)',
        description: 'This course provides small and medium-sized enterprise (SME) staff in the UK with a practical understanding of the UK General Data Protection Regulation (GDPR) and its data protection principles. Written in plain English for non-technical employees.',
        shortDescription: 'Practical GDPR training for UK SME staff - Master data protection principles in plain English.',
        duration: 90,
        level: 'beginner',
        tags: ['GDPR', 'UK GDPR', 'Data Protection', 'SME', 'Compliance', 'ICO'],
        heroImage: '/api/placeholder/600/400',
        isPublished: true,
        createdBy: 'admin1',
        createdAt: new Date(),
        lessons: [
          {
            _id: 'lesson1',
            title: 'Module 1: Introduction to GDPR and Data Protection',
            description: 'Understanding GDPR, its importance, and why it matters for your organisation',
            type: 'text',
            content: 'The General Data Protection Regulation (GDPR) is a law designed to protect personal data and privacy rights. In the UK, we follow the **UK GDPR**—based on the EU GDPR but adopted into UK law—and it is enforced by the **Information Commissioner\'s Office (ICO)**.\n\nGDPR applies to every organisation that handles personal data, regardless of size, and **every employee shares responsibility** for protecting that data. Data protection is not just an IT or legal matter; it\'s an organisational responsibility.\n\n**Why GDPR matters:**\n\nPersonal data includes any information that identifies a living individual—such as names, emails, addresses, ID numbers, or phone records. GDPR was introduced to give people greater control over their information and ensure organisations handle it properly.\n\nFor SMEs, compliance with GDPR helps to **build customer trust, protect reputation, and avoid penalties**. Serious GDPR violations can result in significant fines—up to **£17.5 million or 4% of annual global turnover**—and can severely damage a business\'s credibility. Beyond fines, a data breach can lead to loss of confidence and customer relationships.\n\n**Key points:**\n\nGDPR demands fairness, transparency, and security in all data handling. Throughout this course, we will cover what qualifies as personal data, the principles that govern its use, individuals\' rights, and the practical steps to remain compliant.\n\nReal-world examples will show how simple mistakes—like sending an email to the wrong person or using weak passwords—can lead to data breaches. **Protecting personal data is everyone\'s responsibility**, from front-line employees to senior management. By understanding GDPR, you help foster a culture of trust and compliance across the organisation.',
            duration: 15,
            order: 1,
            isPublished: true
          },
          {
            _id: 'lesson2',
            title: 'Module 2: Understanding Personal Data and Lawful Processing',
            description: 'What counts as personal data and the lawful bases for processing it',
            type: 'text',
            content: 'In this module, we explore what "personal data" means and the lawful bases that determine how it can be used.\n\n**What is personal data?**\n\nPersonal data refers to any information relating to an **identified or identifiable person**. This includes obvious details such as names, addresses, and emails, as well as less obvious identifiers like employee IDs, IP addresses, or even photos that can identify a person.\n\nIf information can be linked back to a specific individual, treat it as personal data. For example:\n• A customer\'s phone number\n• A client\'s social media handle\n• Employee ID numbers\n\nIn contrast, truly anonymous data—where all identifiers have been removed—is not personal data.\n\n**Special category data:**\n\nSome personal data is more sensitive and requires **additional protection**. These "special category" types include information about an individual\'s:\n• Race or ethnicity\n• Political opinions\n• Religious or philosophical beliefs\n• Health\n• Sexual orientation\n• Biometric and genetic data\n\nHandling such data requires explicit consent or another specific legal condition. For instance, if you process health data for insurance or use biometric identifiers for access control, stricter safeguards are legally required.\n\n**Lawful processing:**\n\nUnder GDPR, personal data can only be used when there is a valid **lawful basis**. The six lawful bases are:\n\n1. **Consent** – The person has given clear permission\n2. **Contract** – Processing is necessary for a contract with the person\n3. **Legal obligation** – Processing is required by law\n4. **Vital interests** – Needed to protect someone\'s life\n5. **Public task** – Performed in the public interest or under official authority\n6. **Legitimate interests** – The organisation or a third party has a valid reason, balanced against individuals\' rights\n\nYou don\'t need to memorise them all, but you should understand the principle: **personal data cannot be used arbitrarily**. There must be a justified and lawful reason.\n\n**Practical tips:**\n\n• Collect only the personal data you truly need for your role\n• Be especially careful with sensitive data and do not share it unnecessarily, even internally\n• Always confirm that there is a clear reason and that the individual knows how their data will be used\n• If unsure, ask your manager or data protection officer',
            duration: 18,
            order: 2,
            isPublished: true
          },
          {
            _id: 'lesson3',
            title: 'Module 3: The Seven Principles of GDPR',
            description: 'The seven fundamental principles that underpin all GDPR compliance',
            type: 'text',
            content: 'GDPR is built on **seven key principles** that act as the foundation of good data protection practice. Think of them as the "rules of the road" for handling personal data.\n\n**1. Lawfulness, Fairness, and Transparency**\n\nProcess data lawfully, fairly, and openly. This means using a valid legal basis and being clear about how data is used. Don\'t mislead individuals or use their data for unexpected purposes.\n\n**2. Purpose Limitation**\n\nCollect data for a **specific, explicit purpose** and use it only for that purpose. Don\'t repurpose it for something unrelated without consent.\n\nExample: If you collect email addresses for order confirmations, don\'t use them for marketing without permission.\n\n**3. Data Minimisation**\n\nCollect and keep **only what you need**. Avoid unnecessary or excessive data collection.\n\nExample: If you only need a delivery address, don\'t ask for someone\'s date of birth.\n\n**4. Accuracy**\n\nEnsure that data is **accurate and kept up to date**. Correct errors promptly.\n\nExample: If a customer notifies you of a change of address, update your records immediately.\n\n**5. Storage Limitation**\n\nDon\'t keep data **longer than needed**. Once it\'s no longer required, securely delete or anonymise it.\n\nExample: Customer data from a completed transaction should be deleted after the legal retention period expires.\n\n**6. Integrity and Confidentiality (Security)**\n\nKeep data **secure** from loss, alteration, or unauthorised access. This includes both technical measures (passwords, encryption) and organisational measures (training, access controls).\n\nExample: Use strong passwords, lock your screen, and encrypt sensitive files.\n\n**7. Accountability**\n\n**Demonstrate compliance**. Keep records, maintain policies, and show that your organisation takes data protection seriously.\n\nExample: Document consents, maintain data processing records, and conduct regular reviews.\n\n**Summary:**\n\nThese principles are the cornerstone of GDPR compliance. Violating them can lead to serious legal and financial consequences. The key is to make them part of your everyday decisions—always consider whether what you\'re doing is fair, transparent, necessary, and secure.',
            duration: 16,
            order: 3,
            isPublished: true
          },
          {
            _id: 'lesson4',
            title: 'Module 4: Individuals\' Rights under GDPR',
            description: 'Understanding the rights individuals have over their personal data',
            type: 'text',
            content: 'GDPR gives individuals several rights over their personal data. As an SME employee, you should recognise these rights and understand how to respond if someone exercises them.\n\n**Right to be Informed**\n\nPeople have the right to know how their data will be used. This is usually communicated through privacy notices or clear explanations when data is collected.\n\n**Right of Access (Subject Access Request)**\n\nIndividuals can request a **copy of their data** and details of how it\'s processed. Requests should be acknowledged and responded to **within one month**.\n\nExample: A customer asks, "What personal information do you hold about me?"\n\n**Right to Rectification**\n\nIf data is **inaccurate or incomplete**, it must be corrected as soon as possible.\n\nExample: A client notices their address is wrong and asks you to update it.\n\n**Right to Erasure ("Right to be Forgotten")**\n\nPeople can ask for their data to be **deleted** in specific circumstances, such as when it\'s no longer needed or consent is withdrawn. There are exceptions, for example where data must be retained for legal reasons.\n\nExample: A former customer requests deletion of their account and purchase history.\n\n**Right to Restrict Processing**\n\nIndividuals can request that processing be **limited**—for example, while a dispute about accuracy or an objection is being resolved.\n\nExample: Someone contests the accuracy of their data and asks you to stop using it until verified.\n\n**Right to Data Portability**\n\nPeople can ask for their data in a **machine-readable format**, or for it to be transferred to another organisation.\n\nExample: A customer wants to transfer their account data to a competitor.\n\n**Right to Object**\n\nIndividuals can **object** to certain types of processing, such as direct marketing or processing under legitimate interests, unless there are overriding reasons to continue.\n\nExample: Someone unsubscribes from your mailing list.\n\n**Rights regarding Automated Decision-Making and Profiling**\n\nPeople have the right to be informed about and **challenge decisions** made entirely by automated systems that significantly affect them.\n\nExample: A loan application is automatically rejected by software—the applicant can ask for human review.\n\n**What to do if you receive a request:**\n\n• Take it seriously and follow internal procedures\n• Don\'t ignore or delay—respond within one month\n• Escalate to your manager or data protection officer immediately\n• Respecting these rights is both a legal obligation and an important part of maintaining customer trust',
            duration: 17,
            order: 4,
            isPublished: true
          },
          {
            _id: 'lesson5',
            title: 'Module 5: Data Security and Breach Management',
            description: 'Protecting personal data and responding to data breaches',
            type: 'text',
            content: 'Protecting personal data is central to GDPR compliance. Security involves ensuring **confidentiality** (data isn\'t accessed by unauthorised people), **integrity** (data isn\'t altered improperly), and **availability** (data is accessible when needed).\n\n**Protecting data day-to-day:**\n\n• **Follow company policies** at all times\n• Use **strong, unique passwords** and enable multi-factor authentication where available\n• **Lock your computer screen** when stepping away\n• Be cautious with emails—**double-check addresses** before sending and use encryption or password-protected files when necessary\n• Store **paper documents securely** and shred them when no longer needed\n• For digital files, follow **secure deletion procedures**\n• Access personal data **only when necessary** and only for legitimate purposes\n\n**Preventive measures:**\n\nTechnology like firewalls and antivirus software helps, but **human error remains a major risk**. Be vigilant for:\n\n• **Phishing emails** – suspicious messages asking for passwords or personal information\n• **Social engineering** – tricks to manipulate you into revealing data\n• **Unsecured devices** – don\'t plug in unknown USB drives\n\nAvoid using personal cloud storage for business data, and never share passwords.\n\n**What is a data breach?**\n\nA data breach occurs when personal data is **lost, accessed, disclosed, or altered without authorisation**—whether accidentally or intentionally.\n\nExamples include:\n• Lost laptops or USB drives\n• Emails sent to the wrong recipient\n• Hacking or malware infections\n• Unauthorised access to databases\n• Physical theft of documents\n\nIf a breach could harm individuals, the **ICO must be notified within 72 hours**, and affected individuals may also need to be informed.\n\n**Responding to a breach:**\n\n1. **Report it immediately** following our incident procedure\n2. **Do not try to fix or hide it yourself**\n3. Provide all relevant details to your manager or data protection officer\n4. Prompt action helps minimise harm and ensures legal obligations are met\n\n**Real-world perspective:**\n\nMost breaches result from **preventable errors** such as:\n• Clicking phishing links\n• Using weak passwords\n• Misconfiguring systems\n• Failing to encrypt devices\n\nSimple awareness and quick reporting can prevent small mistakes from escalating into serious incidents. **Good data security is a daily habit, not a one-time task.**',
            duration: 16,
            order: 5,
            isPublished: true
          },
          {
            _id: 'lesson6',
            title: 'Module 6: Accountability, Compliance, and Best Practices for SMEs',
            description: 'Maintaining ongoing compliance and embedding data protection into daily operations',
            type: 'text',
            content: 'In this final module, we focus on maintaining ongoing compliance. GDPR is not a one-time task—it\'s a **continual responsibility** under the principle of accountability.\n\n**Policies and procedures:**\n\nOur company has data protection policies governing:\n• Data retention\n• Breach management\n• Consent\n• Handling of subject rights requests\n\nUnderstand and follow them carefully. If you manage or process personal data, ensure you know the correct procedure for your area.\n\n**Training and awareness:**\n\nCompliance depends on everyone. **Keep your knowledge up to date**, attend refresher training, and ask for clarification whenever needed. When in doubt, consult our data protection officer.\n\n**Record-keeping and documentation:**\n\nAccurate documentation is essential. You may need to:\n• Record consents\n• Maintain spreadsheets of customer updates\n• Contribute to impact assessments for new projects\n\nThese activities show regulators—and ourselves—that we take GDPR seriously.\n\n**Continuous improvement:**\n\nStay aware of legal updates and best practices. Review internal policies regularly and **learn from past incidents or near misses**. Each lesson strengthens our data protection culture.\n\n**Privacy by design and by default:**\n\nIncorporate privacy considerations into every new process or project **from the start**. Whether launching a new campaign or adopting a new system, ask:\n• Is this necessary?\n• Is it transparent?\n• Is it secure?\n\nExample: Before collecting customer emails for a newsletter, ensure there\'s a clear opt-in and unsubscribe mechanism.\n\n**Leadership and support:**\n\nManagement is responsible for creating a culture that values compliance and empowers staff to raise concerns. Everyone should feel comfortable **speaking up** about potential risks or suspicious activities.\n\n**Business benefits:**\n\nGood data protection is good business. It:\n• Enhances efficiency\n• Builds customer confidence\n• Strengthens reputation\n• Reduces the risk of fines and breaches\n\n**Final recap:**\n\nYou have learned:\n• What personal data is\n• The seven principles of GDPR\n• Individuals\' rights\n• Data security practices\n• How accountability keeps compliance ongoing\n\nBy following these practices, our SME can **remain compliant, reduce risk, and maintain customer trust**.\n\n**Remember:** Data protection is everyone\'s responsibility. Your awareness and actions make a real difference in protecting our organisation and the people we serve.',
            duration: 18,
            order: 6,
            isPublished: true
          }
        ],
        quizQuestions: [
          {
            _id: 'quiz1',
            question: 'What is the primary purpose of the GDPR?',
            options: [
              'To ensure companies pay more taxes to the government',
              'To protect individuals\' personal data and privacy rights',
              'To standardize consumer product safety labels',
              'To allow unrestricted use of personal information for business efficiency'
            ],
            correctIndex: 1,
            explanation: 'GDPR is designed to protect people\'s personal data and give them control over how it\'s used. It\'s all about privacy and data protection, not taxes or product safety.',
            order: 1
          },
          {
            _id: 'quiz2',
            question: 'Which UK regulator is responsible for overseeing and enforcing GDPR compliance?',
            options: [
              'The Information Commissioner\'s Office (ICO)',
              'The National Cyber Security Centre (NCSC)',
              'The Competition and Markets Authority (CMA)',
              'The Department for Business and Trade'
            ],
            correctIndex: 0,
            explanation: 'The ICO is the UK\'s independent data protection authority, responsible for upholding information rights (including GDPR compliance). NCSC deals with cybersecurity (not a regulator for GDPR), and the others are unrelated to data protection.',
            order: 2
          },
          {
            _id: 'quiz3',
            question: 'Which of the following is considered personal data under GDPR?',
            options: [
              'A company\'s registration number (business ID)',
              'An individual\'s email address (e.g. jane.doe@example.com)',
              'An encrypted anonymous code with no way to trace it to a person',
              'A general office location (city name) with no person identified'
            ],
            correctIndex: 1,
            explanation: 'An email that identifies an individual is personal data. Personal data is any information about an identifiable person. A company number is about a legal entity (not a person), truly anonymous data is not linked to an individual, and a generic location not tied to someone isn\'t personal data.',
            order: 3
          },
          {
            _id: 'quiz4',
            question: 'Which of these is NOT one of the seven core principles of GDPR?',
            options: [
              'Data Minimisation',
              'Purpose Limitation',
              'Customer Service Excellence',
              'Integrity and Confidentiality'
            ],
            correctIndex: 2,
            explanation: 'Customer Service Excellence is not a GDPR principle. The GDPR principles are Lawfulness/Fairness/Transparency, Purpose Limitation, Data Minimisation, Accuracy, Storage Limitation, Integrity & Confidentiality (Security), and Accountability.',
            order: 4
          },
          {
            _id: 'quiz5',
            question: 'The principle of "data minimisation" means:',
            options: [
              'Collect as much data as possible now, in case it\'s useful later',
              'Only collect and use the personal data that you truly need for a specific purpose',
              'Minimizing the number of people who know about GDPR',
              'Storing data in as few servers as possible'
            ],
            correctIndex: 1,
            explanation: 'Data minimisation is about limiting personal data collection and use to what is necessary. It\'s the "less is more" approach to personal data. Collecting extra data "just in case" would violate this principle.',
            order: 5
          },
          {
            _id: 'quiz6',
            question: 'If a person asks, "I want a copy of all the information your company has about me," which GDPR right are they exercising?',
            options: [
              'Right to Rectification',
              'Right to Restrict Processing',
              'Right of Access (Subject Access Request)',
              'Right to Object'
            ],
            correctIndex: 2,
            explanation: 'That request is a Subject Access Request, using their right of access. It means the individual is asking to access their personal data that the company holds.',
            order: 6
          },
          {
            _id: 'quiz7',
            question: 'An employee at an SME is organizing a marketing email list. According to GDPR, what must the company ensure for the people on that list?',
            options: [
              'That everyone on the list has at least one social media account',
              'That it has a lawful basis (like consent) to use their email and that they have been informed of this use',
              'That the list is alphabetically ordered',
              'That it includes as much personal detail as possible for better targeting'
            ],
            correctIndex: 1,
            explanation: 'Using people\'s emails for marketing requires a lawful basis (often consent or legitimate interest for marketing) and transparency (people should know they\'re on the list and why). Option D contradicts data minimisation.',
            order: 7
          },
          {
            _id: 'quiz8',
            question: 'Which of the following is special category (sensitive) personal data that has extra protections under GDPR?',
            options: [
              'A client\'s postal address',
              'A customer\'s credit card number',
              'An employee\'s health record detailing a medical condition',
              'A list of business registration numbers for suppliers'
            ],
            correctIndex: 2,
            explanation: 'Health information is considered special category data and is sensitive. It requires extra care and often explicit consent or other specific conditions to process.',
            order: 8
          },
          {
            _id: 'quiz9',
            question: 'Under GDPR\'s storage limitation principle, which practice is most appropriate?',
            options: [
              'Keep personal data indefinitely, even if it\'s no longer needed, just in case',
              'Delete personal data as soon as you\'re done with the purpose, unless there\'s a good reason or requirement to keep it longer',
              'Store old personal data on an unsecured hard drive just to get it out of the main system',
              'Save every piece of personal data to the cloud without any retention policy'
            ],
            correctIndex: 1,
            explanation: 'GDPR requires that personal data not be kept longer than necessary for its purpose. Once the data isn\'t needed (and no law requires retention), it should be securely deleted or anonymized. Indefinite retention "just in case" violates this principle.',
            order: 9
          },
          {
            _id: 'quiz10',
            question: 'A customer withdraws the consent they gave your company to use their data. What should you do to stay GDPR-compliant?',
            options: [
              'Immediately stop the processing of their data that was based on consent and honor their request',
              'Ignore the withdrawal because consent, once given, can\'t be retracted',
              'Charge them a fee for the inconvenience and then stop processing',
              'Tell them it will take 10 years to process the withdrawal'
            ],
            correctIndex: 0,
            explanation: 'If a person withdraws consent, GDPR says that any processing that relied on consent must cease. Consent must be as easy to withdraw as to give. We should promptly stop using their data for that purpose. You cannot charge a fee for this or refuse.',
            order: 10
          },
          {
            _id: 'quiz11',
            question: 'Which scenario is an example of a personal data breach that might need to be reported to the ICO?',
            options: [
              'An employee accidentally sends an email containing 100 customers\' personal details to the wrong email address',
              'A company computer crashes but no data is lost or exposed (and is backed up)',
              'Two employees swap their company phone extensions',
              'A planned server maintenance causes a few minutes of website downtime with no data loss'
            ],
            correctIndex: 0,
            explanation: 'Sending personal data to an incorrect recipient is a security incident involving unauthorized disclosure of personal data – this is a data breach. If it poses risks to those customers, it may need to be reported to the ICO within 72 hours.',
            order: 11
          },
          {
            _id: 'quiz12',
            question: 'How soon must a serious personal data breach be reported to the ICO once your organization becomes aware of it?',
            options: [
              'Within 24 hours',
              'Within 72 hours',
              'Within 30 days',
              'Only during annual reporting, no immediate requirement'
            ],
            correctIndex: 1,
            explanation: 'GDPR mandates that significant data breaches that pose risks to individual rights be reported to the regulator (ICO) without undue delay and where feasible, within 72 hours of awareness.',
            order: 12
          },
          {
            _id: 'quiz13',
            question: 'True or False: GDPR only applies to digital data, not to paper records.',
            options: [
              'True – GDPR is only about computer data',
              'False – GDPR applies to personal data in most forms, digital or paper (as long as paper records are in a structured filing system)',
              'True – Paper records are covered by different legislation',
              'False – GDPR only applies to paper records'
            ],
            correctIndex: 1,
            explanation: 'GDPR isn\'t limited to digital data. It also covers personal data in manual filing systems (structured files). So, printed documents, forms, letters etc. with personal info are protected too.',
            order: 13
          },
          {
            _id: 'quiz14',
            question: 'An individual says they don\'t want your company to use their data for direct marketing anymore. What GDPR right are they using, and what should you do?',
            options: [
              'Right to Object; you should stop sending them marketing messages',
              'Right to Portability; you should export their data',
              'Right to be Informed; you should send them a privacy notice',
              'Right to Remain Silent; do nothing until they contact you again'
            ],
            correctIndex: 0,
            explanation: 'They are exercising their right to object to processing (specifically for direct marketing). Under GDPR, when someone objects to direct marketing, you must honor it – cease using their data for that marketing purpose.',
            order: 14
          },
          {
            _id: 'quiz15',
            question: 'Which of the following actions best demonstrates accountability in GDPR compliance by an organization?',
            options: [
              'Having detailed records of where personal data is stored and who has access, and regularly reviewing these records',
              'Keeping GDPR policies only in the head of one manager, with no documentation',
              'Ignoring data protection until an auditor shows up',
              'Deleting all emails every 24 hours to avoid having to comply with requests'
            ],
            correctIndex: 0,
            explanation: 'Documenting data processing activities, access, and periodically reviewing security and privacy measures shows accountability and the ability to demonstrate compliance.',
            order: 15
          },
          {
            _id: 'quiz16',
            question: 'Which of these is not an example of appropriate security measure for protecting personal data?',
            options: [
              'Encrypting a file before storing or sending sensitive personal data',
              'Requiring a strong password and two-factor authentication for accessing employee HR records',
              'Keeping sensitive customer files in a locked cabinet or restricted-access drive',
              'Sharing login passwords among all team members so everyone can access data easily'
            ],
            correctIndex: 3,
            explanation: 'Sharing passwords undermines security and is not an appropriate measure – each user should have individual credentials. The other options (encryption, strong authentication, physical and access controls) are good practices.',
            order: 16
          },
          {
            _id: 'quiz17',
            question: 'If your company uses a cloud service provider to store customer data, that provider is a "data processor." According to GDPR, what is a key responsibility of your company (the data controller) in this relationship?',
            options: [
              'The company has no responsibilities once the data is in the cloud',
              'The company must ensure there\'s a proper contract/Data Processing Agreement in place and that the processor protects the data appropriately',
              'The company must give the processor full freedom to use the data however it wants',
              'The company should hide the use of the cloud provider from customers'
            ],
            correctIndex: 1,
            explanation: 'Under GDPR, data controllers must only use processors that can provide sufficient guarantees of GDPR compliance and security. There should be a contract or Data Processing Agreement in place. The controller retains responsibility for the data.',
            order: 17
          },
          {
            _id: 'quiz18',
            question: 'You receive an email from someone claiming to be a customer, asking for all their personal data to be sent to a new email address. What should you do first?',
            options: [
              'Immediately send all the data to that email address to comply quickly',
              'Verify the identity of the requester (to ensure they are who they claim) before processing such a sensitive request',
              'Ignore the email because it sounds like phishing',
              'Delete the customer\'s data instead of sending it'
            ],
            correctIndex: 1,
            explanation: 'Before fulfilling a subject access request or any request involving personal data, you must verify the person\'s identity to ensure you\'re not sending personal data to the wrong person (which would be a breach).',
            order: 18
          },
          {
            _id: 'quiz19',
            question: 'A colleague is about to send a bulk email to 100 clients and plans to put all addresses in the "To:" field, visible to everyone. Why is this a bad idea under GDPR?',
            options: [
              'It exposes each client\'s email address to all the others without permission, potentially a data breach of personal data',
              'It\'s not a bad idea; it\'s allowed as long as the content is about marketing',
              'Because emails should always be sent by postal mail instead',
              'GDPR doesn\'t apply to emails'
            ],
            correctIndex: 0,
            explanation: 'Listing recipients openly (instead of using "BCC") would share each person\'s email (personal data) with all other recipients, which is unauthorized disclosure. This could be considered a personal data breach. The correct approach is to use BCC.',
            order: 19
          },
          {
            _id: 'quiz20',
            question: 'Which statement best describes "privacy by design" as encouraged by GDPR?',
            options: [
              'Building processes and systems with data protection in mind from the start, not as an afterthought',
              'Designing marketing materials to include a privacy policy in tiny font',
              'Only worrying about privacy after a project is completed',
              'Leaving privacy considerations solely to the IT department'
            ],
            correctIndex: 0,
            explanation: 'Privacy by design and by default means considering privacy and data protection issues early in the design of systems, services, and processes. It\'s an organizational mindset where protecting data is baked into projects from the beginning.',
            order: 20
          }
        ]
      },
      {
        _id: 'course2',
        title: 'Cybersecurity Training Course (SME Edition)',
        description: 'This course covers fundamental cybersecurity awareness for SME staff, drawing on established guidance from leading authorities. It consists of six modules addressing common threats and best practices.',
        shortDescription: 'Essential cybersecurity awareness for SME staff - Protect your organization from cyber threats.',
        duration: 90,
        level: 'beginner',
        tags: ['Cybersecurity', 'SME', 'Security Awareness', 'Phishing', 'Passwords', 'Incident Response'],
        heroImage: '/api/placeholder/600/400',
        isPublished: true,
        createdBy: 'admin1',
        createdAt: new Date(),
        lessons: [
          {
            _id: 'lesson6',
            title: 'Module 1: Introduction to Cybersecurity – Why It Matters for SMEs',
            description: 'Understanding cybersecurity threats and why they matter for small and medium businesses',
            type: 'text',
            content: 'Cybersecurity is critical for businesses of all sizes. Small and medium businesses are often targeted because attackers perceive them as having weaker defences. Many organisations experience a cybersecurity breach or attack each year, so there\'s a significant chance we will face an incident if we aren\'t prepared. Threats range from data theft and account compromise to malware (including ransomware) and scams that trick employees into revealing passwords.\n\n**Consequences of attacks:**\n\nFor SMEs, a serious incident can be devastating: **financial loss, legal penalties** (especially where personal data is involved), and **reputational damage**. Serious disruption—such as losing access to data due to ransomware or suffering a large-scale data leak—can halt operations and be extremely costly to recover.\n\n**Everyone\'s responsibility:**\n\nCybersecurity isn\'t just an IT job. Many attacks exploit people—e.g., tricking someone into clicking a malicious link or divulging a password (social engineering). A large share of attacks involve human factors, so **our behaviour and awareness are key defences**. Vigilance and good habits can stop attacks in their tracks; careless actions (weak passwords, ignoring updates) can open the door.\n\n**Common threats:**\n\nFrequent causes of breaches include:\n• Phishing\n• Brute-force attacks on passwords\n• Malware\n• Denial-of-service attacks\n• Human error or misconfiguration (e.g., default passwords, wrong recipients)\n• Supply-chain compromises\n\nPhishing emails are common; weak passwords and outdated software are easily exploited by automated scans.\n\n**Course roadmap:**\n\nWe\'ll cover strong passwords and authentication, secure use of devices and networks, recognising phishing and social engineering, safe data handling and physical security, and incident response. Cybersecurity depends on **people, processes, and technology**. Leadership provides tools and policies, but employees are the frontline. Simple measures—firewalls, strong passwords, timely updates, malware protection, and access control—block a large percentage of attacks. With consistent attention, cybersecurity is manageable.',
            duration: 15,
            order: 1,
            isPublished: true
          },
          {
            _id: 'lesson7',
            title: 'Module 2: Passwords and Authentication – Your First Line of Defense',
            description: 'Creating strong passwords and using multi-factor authentication effectively',
            type: 'text',
            content: 'Passwords are the keys to our accounts. If attackers obtain them, they can impersonate us and access sensitive information. Weak or stolen passwords remain a leading cause of breaches—but a few practices make a big difference.\n\n**Use strong passwords:**\n\nAvoid obvious choices like "password123," names, or simple sequences. Use **long, memorable passphrases** (e.g., three random words). Length and unpredictability are key—aim for **at least 12 characters**. Adding numbers or symbols can help.\n\n**Unique passwords for every account:**\n\nNever reuse passwords. If one account is breached, attackers try the same password elsewhere. Use a **password manager** to generate and store unique passwords. At a minimum, separate work and personal passwords, and use distinct passwords for critical accounts like email.\n\n**Protect your passwords:**\n\n• Never share passwords\n• Legitimate staff or vendors won\'t ask for them\n• Don\'t leave passwords on sticky notes or in unlocked drawers\n• Change default passwords immediately (e.g., for routers or new devices)\n• Treat "security question" answers like passwords—use information only you know\n\n**Enable Multi-Factor Authentication (MFA):**\n\nTurn on MFA wherever possible (app codes, text codes, hardware tokens, biometrics). It\'s a **second lock**: even if a password is stolen, an attacker still can\'t get in. MFA stops the vast majority of automated account attacks and adds only a few seconds to log in.\n\n**Brute force and common passwords:**\n\nAttackers use tools to guess passwords rapidly and rely on lists of common passwords. That\'s why we block common choices and lock accounts after repeated failed attempts. If your account locks unexpectedly, it could be a sign of an attack—notify IT.\n\n**Bottom line:**\n\nMake passwords strong and unique, keep them secret, and add MFA. If you suspect a compromise (e.g., after a phishing click or public breach), change the password immediately and inform IT for any work accounts.',
            duration: 16,
            order: 2,
            isPublished: true
          },
          {
            _id: 'lesson8',
            title: 'Module 3: Secure Use of Devices and Networks',
            description: 'Protecting devices, networks, and data in office and remote environments',
            type: 'text',
            content: 'Our devices and networks are essential—and targeted. Keep them secure with these practices.\n\n**Device security basics:**\n\n• **Lock your screen** whenever you step away\n• Use **strong device passwords or PINs**\n• Ensure **device encryption** is enabled\n• Report lost or stolen devices immediately so they can be remotely wiped or disabled\n\n**Updates and patches:**\n\nInstall operating system, application, and security updates **promptly**. Updates fix vulnerabilities. Allow automatic updates where possible and keep antivirus/protection tools current.\n\n**Antivirus and anti-malware:**\n\nUse company-provided endpoint protection and heed warnings. **Avoid unknown USB drives**—never plug in found or freebie devices. If in doubt, hand them to IT.\n\n**Safe software practices:**\n\nInstall only approved or reputable software and browser extensions. Avoid pirated or suspicious downloads. If you need new tools, request them through proper channels.\n\n**Network security (office and remote):**\n\nUse secure, approved networks. **Avoid public Wi-Fi** for sensitive work unless using a VPN. At home, protect your Wi-Fi with a strong password and modern encryption, and change default router admin credentials.\n\n**BYOD (bring your own device):**\n\nIf personal devices are allowed, they may require a management app for security controls and remote wipe. Keep personal devices updated and don\'t mix work data with risky personal apps or cloud storage without permission.\n\n**Physical security of devices:**\n\nDon\'t leave laptops unattended; consider cable locks. Be mindful of **shoulder surfing**; use privacy screens where needed. Lock offices and storage areas.\n\n**Backups:**\n\nSave important files to **company-managed locations** that are backed up. This protects against device failure and ransomware.',
            duration: 17,
            order: 3,
            isPublished: true
          },
          {
            _id: 'lesson9',
            title: 'Module 4: Phishing and Social Engineering – Don\'t Get Hooked',
            description: 'Recognizing and responding to phishing attempts and social engineering tactics',
            type: 'text',
            content: 'Phishing targets people by impersonating trusted senders to steal information or trigger harmful actions. Attacks may arrive via email, text ("smishing"), phone ("vishing"), or social media.\n\n**Recognising phishing attempts:**\n\nRed flags include:\n• **Urgent or threatening language** ("act now")\n• **Suspicious sender addresses** (subtle misspellings or odd domains)\n• **Generic greetings** or unexpected content (invoices, delivery notices you weren\'t expecting)\n• Poor spelling/grammar (though some are polished)\n• **Links that don\'t match** their visible text (hover to check)\n• Unexpected attachments, especially those asking to enable macros\n\n**What to do (and avoid):**\n\n• **Don\'t click** suspicious links or open unexpected attachments\n• Don\'t reply with sensitive information\n• **Verify independently**—type known URLs yourself or call official numbers\n• For unusual internal requests (e.g., from an executive), confirm via a separate channel (call or chat) before acting\n\n**Report phishing:**\n\nUse our internal reporting method (e.g., "Report Phishing" button or forward to security). Reporting helps protect colleagues and improves filters. **Better a false alarm than a missed threat.**\n\n**Beyond email:**\n\nBeware of:\n• Phone scams pretending to be IT, banks, or suppliers asking for credentials or codes. **Verify callers.**\n• In person, watch for **tailgating** into secure areas; politely challenge or verify visitors\n• Avoid oversharing work details on social media\n\n**Ransomware via phishing:**\n\nMany ransomware infections start with a malicious attachment or link. Be especially cautious with files prompting "Enable Content/Macros."\n\n**If you slip up:**\n\nIf you clicked a link or entered credentials, **change your password immediately** from a clean device and contact IT. Quick action limits damage.',
            duration: 16,
            order: 4,
            isPublished: true
          },
          {
            _id: 'lesson10',
            title: 'Module 5: Safe Data Handling and Physical Security',
            description: 'Protecting data through proper handling and physical security measures',
            type: 'text',
            content: 'Cybersecurity also means safeguarding data in everyday tasks and protecting the physical environment.\n\n**Clean desk, clear screen:**\n\nDon\'t leave sensitive documents on desks. **Lock screens** whenever you step away. At day\'s end, secure or dispose of confidential papers appropriately.\n\n**Printing and paperwork:**\n\n• Retrieve printouts immediately\n• Use secure print for confidential documents\n• **Shred sensitive waste**; don\'t use regular bins\n• Don\'t leave notebooks or sticky notes with sensitive info in shared spaces\n\n**Physical access control:**\n\n• Wear badges where required\n• **Don\'t hold doors open** for unknown individuals\n• Politely verify visitors and ensure they\'re escorted as needed\n• Lock cabinets containing sensitive records; keep keys secure\n\n**Storage and transfer of data:**\n\n• Use **approved storage** (company servers or cloud) rather than personal USBs\n• Encrypt removable media if sensitive data must be stored\n• **Double-check recipients** before emailing\n• For external sharing, use encryption or secure transfer methods; share passwords via a separate channel\n\n**Data minimisation:**\n\nOnly carry the data you need. Don\'t leave devices or media unattended in cars or public places.\n\n**Confidentiality:**\n\n• Access data strictly on a **need-to-know basis**\n• Be discreet on calls in public\n• Verify identity before disclosing information to callers or email requesters\n\n**Common pitfalls to avoid:**\n\n• Misaddressed emails are a frequent cause of breaches\n• Never write passwords on visible notes\n• Always shred sensitive documents',
            duration: 15,
            order: 5,
            isPublished: true
          },
          {
            _id: 'lesson11',
            title: 'Module 6: Incident Response and Reporting',
            description: 'Recognizing incidents and responding quickly to minimize damage',
            type: 'text',
            content: 'Incidents can happen despite precautions. What matters most is a **rapid, coordinated response**.\n\n**Recognising an incident:**\n\nExamples include:\n• Ransomware notices\n• Unusual device behaviour\n• Suspicious logins\n• Emails sent to the wrong recipient\n• Lost devices\n• Unauthorised physical access\n\n**When in doubt, treat it as an incident.**\n\n**Immediate actions:**\n\n• If you suspect malware, **disconnect from the network** (turn off Wi-Fi or unplug Ethernet) and call IT\n• If you entered credentials on a suspicious site, **change your password immediately** from a clean device and notify IT\n• Report lost or stolen devices at once\n\n**Who to contact:**\n\nFollow our incident reporting procedure (manager and/or IT/security team). **Time is critical**, especially if personal data may be involved. Don\'t delay reporting out of embarrassment—early reporting reduces harm.\n\n**What to report:**\n\nDescribe:\n• What happened\n• When it started\n• Any unusual messages\n• Data involved\n• Actions taken so far\n\nPreserve evidence (don\'t delete suspicious emails or files unless told to do so).\n\n**Do not:**\n\n• Hide incidents\n• Attempt solo fixes that could worsen the situation\n• Contact attackers or pay ransoms\n• Follow the response team\'s guidance\n\n**Response and recovery:**\n\nThe team will identify, contain, eradicate, and recover, then capture lessons learned. You may be asked to assist. If personal data is involved, required notifications will be handled by the appropriate leads.\n\n**Learning culture:**\n\nEvery incident or near miss is an opportunity to strengthen defences—expect updates to processes, training, or controls as we improve continuously.\n\n**Why reporting matters:**\n\nTimely reporting secures expert support and helps disrupt criminal activity more broadly. **Think of it like pulling a fire alarm—fast action protects everyone.**',
            duration: 16,
            order: 6,
            isPublished: true
          }
        ],
        quizQuestions: [
          {
            _id: 'quiz21',
            question: 'True or False: Small businesses are not likely to be targets of cyber attacks, so they don\'t need to worry as much about cybersecurity.',
            options: [
              'True',
              'False'
            ],
            correctIndex: 1,
            explanation: 'False. SMEs are very much targets of cyber attacks. Many businesses suffer a cyber breach or attack each year. Attackers often target smaller firms expecting weaker defenses, so SMEs must stay vigilant.',
            order: 1
          },
          {
            _id: 'quiz22',
            question: 'What is phishing?',
            options: [
              'A technique to test network performance',
              'A social engineering attack where scammers pose as trustworthy entities to trick you into revealing information or installing malware',
              'Scanning systems for technical vulnerabilities',
              'Using a firewall to block viruses'
            ],
            correctIndex: 1,
            explanation: 'Phishing involves fraudulent emails or messages pretending to be from someone legitimate to steal data or passwords. It\'s an attack technique, not a defense.',
            order: 2
          },
          {
            _id: 'quiz23',
            question: 'Which of the following passwords is the most secure?',
            options: [
              'P@ssw0rd!',
              'alexandersmith (your name concatenated)',
              'CoffeeTrainBanana#92',
              '1234567890'
            ],
            correctIndex: 2,
            explanation: 'CoffeeTrainBanana#92 is a long, unpredictable passphrase with a mix of characters—hard to guess or brute-force. The others are common, guessable, or simple sequences.',
            order: 3
          },
          {
            _id: 'quiz24',
            question: 'Why is reusing the same password on multiple accounts a bad idea?',
            options: [
              'Because it\'s too hard to remember',
              'Because if one account is breached and your password is exposed, attackers can try that password on your other accounts and gain access',
              'It\'s not bad; it\'s efficient',
              'It\'s only bad if you write the password down'
            ],
            correctIndex: 1,
            explanation: 'Reuse means one leak can compromise multiple accounts (credential stuffing). Use unique passwords per account.',
            order: 4
          },
          {
            _id: 'quiz25',
            question: 'Which is the best example of multi-factor authentication (MFA)?',
            options: [
              'Logging in with a username and password only',
              'Password + a one-time verification code sent to your phone',
              'Password + answering a security question (your mother\'s maiden name)',
              'Just using a fingerprint without any password'
            ],
            correctIndex: 1,
            explanation: 'MFA combines two or more factors (something you know + something you have). Security questions are weak; a single biometric alone is still one factor.',
            order: 5
          },
          {
            _id: 'quiz26',
            question: 'What should you do if you receive an email from "IT Support" asking you to urgently verify your username and password by clicking a link?',
            options: [
              'Click the link and enter your details since it says IT Support',
              'Delete the email immediately and do nothing',
              'Be cautious—it\'s likely a phishing attempt. Do not click the link. Verify by contacting IT through official channels and report the email',
              'Reply to the email asking if it\'s legitimate'
            ],
            correctIndex: 2,
            explanation: 'Don\'t click or share credentials. Independently contact IT and report the message.',
            order: 6
          },
          {
            _id: 'quiz27',
            question: 'You find a USB flash drive in the office parking lot. What is the safest action to take?',
            options: [
              'Plug it into your computer to see what\'s on it',
              'Give it to IT/security so they can check it safely',
              'Keep it for personal use',
              'Throw it directly in the trash bin'
            ],
            correctIndex: 1,
            explanation: 'Unknown USBs can carry malware. Let IT handle it safely.',
            order: 7
          },
          {
            _id: 'quiz28',
            question: 'Which practice helps secure your company laptop if it\'s lost or stolen?',
            options: [
              'Having full-disk encryption enabled, plus a strong login password',
              'Keeping all files on the desktop for quick access',
              'Disabling the password requirement for convenience',
              'Leaving it logged in so you don\'t forget the password'
            ],
            correctIndex: 0,
            explanation: 'Encryption + strong authentication protects data if the device is lost.',
            order: 8
          },
          {
            _id: 'quiz29',
            question: 'Your coworker leaves their computer unlocked and unattended. According to good security practices, you should:',
            options: [
              'Ignore it; it\'s not your problem',
              'Lock their screen for them (or politely remind them later) to maintain security',
              'Install a funny screensaver as a prank to teach them a lesson',
              'Use that chance to snoop'
            ],
            correctIndex: 1,
            explanation: 'Lock it and remind them. Snooping or pranking is inappropriate.',
            order: 9
          },
          {
            _id: 'quiz30',
            question: 'Which of these is NOT a recommended way to spot a phishing email?',
            options: [
              'Check for poor grammar or spelling and generic greetings',
              'Hover over links to see if the URL looks legitimate',
              'Verify if the sender\'s email address is exactly from the official domain',
              'Trust an email completely if it has official logos and formatting'
            ],
            correctIndex: 3,
            explanation: 'Logos can be faked. Always verify other details.',
            order: 10
          },
          {
            _id: 'quiz31',
            question: 'If you suspect your computer has been infected with malware (e.g., ransomware message or strange behavior), what\'s the first thing you should do?',
            options: [
              'Shut down or disconnect the computer from the network to prevent spread, then report it',
              'Try to run as many programs as possible to see what\'s working',
              'Ignore it and hope it clears up',
              'Pay the ransom immediately to restore access'
            ],
            correctIndex: 0,
            explanation: 'Isolate the device and notify IT/security.',
            order: 11
          },
          {
            _id: 'quiz32',
            question: 'What does the term "social engineering" refer to in cybersecurity?',
            options: [
              'Designing software interfaces that are user-friendly',
              'Manipulating people through deception to get confidential information or access',
              'Engineering social media platforms',
              'The process of hiring security personnel'
            ],
            correctIndex: 1,
            explanation: 'It\'s about tricking people to gain access or information (e.g., phishing, vishing).',
            order: 12
          },
          {
            _id: 'quiz33',
            question: 'Why is it important to install software updates and patches promptly?',
            options: [
              'Updates only add new features, not security fixes',
              'Hackers quickly exploit known vulnerabilities; updates fix those holes, so delaying updates leaves you at risk',
              'It\'s not important; once software is installed, it\'s secure',
              'Because the IT department gets bonuses for every update installed'
            ],
            correctIndex: 1,
            explanation: 'Patches close known security gaps.',
            order: 13
          },
          {
            _id: 'quiz34',
            question: 'You receive a call on your office phone from someone claiming to be a technician who needs your login details to "fix an urgent issue." What should you do?',
            options: [
              'Give them the details if they sound professional',
              'Refuse to share credentials and verify the person\'s identity via official channels (it\'s likely a vishing attempt)',
              'Pretend to comply, but give a fake password',
              'Put them on hold and hope they hang up'
            ],
            correctIndex: 1,
            explanation: 'Never share credentials; verify independently.',
            order: 14
          },
          {
            _id: 'quiz35',
            question: 'Which of the following is a good practice for email security?',
            options: [
              'Using "BCC" when sending an email to a large list of external recipients, so they don\'t see each other\'s addresses',
              'Turning off spam filters to ensure you don\'t miss any emails',
              'Clicking "unsubscribe" on every unsolicited email, even if it looks phishy',
              'Auto-forwarding work emails to your personal account for convenience'
            ],
            correctIndex: 0,
            explanation: 'BCC protects recipient privacy. The others increase risk or may violate policy.',
            order: 15
          },
          {
            _id: 'quiz36',
            question: 'If you accidentally email a file with sensitive customer data to the wrong external recipient, what should you do immediately?',
            options: [
              'Use the email "Recall" function and hope it works',
              'Contact the recipient, ask them to delete it, and notify your manager/IT about the incident',
              'Delete the sent email from your outbox to erase evidence',
              'Nothing, if the recipient doesn\'t mention it'
            ],
            correctIndex: 1,
            explanation: 'Attempt to contain the issue and report it right away so the organization can assess and respond properly.',
            order: 16
          },
          {
            _id: 'quiz37',
            question: 'What\'s a sign that your computer or phone might have been compromised by malware?',
            options: [
              'It runs out of battery occasionally',
              'You notice unusual activity like programs opening by themselves, a significant slowdown, new toolbars/apps you didn\'t install, or the cursor moving on its own',
              'The device fan is running when you use many applications',
              'You haven\'t restarted it in a week'
            ],
            correctIndex: 1,
            explanation: 'Abnormal behavior and unknown apps can indicate infection—report to IT.',
            order: 17
          },
          {
            _id: 'quiz38',
            question: 'Which action is a good way to protect your online accounts besides using strong passwords?',
            options: [
              'Enabling two-factor authentication wherever possible',
              'Using the same password for social media that you use for work',
              'Sharing your login credentials with a colleague',
              'Writing your passwords in a notebook labeled "Passwords" and leaving it on your desk'
            ],
            correctIndex: 0,
            explanation: '2FA/MFA adds a critical extra layer of security.',
            order: 18
          },
          {
            _id: 'quiz39',
            question: 'What is the first thing you should do if you suspect a security incident (like a possible breach or malware) has occurred?',
            options: [
              'Keep it to yourself until you\'re 100% sure something\'s wrong',
              'Immediately report it to your IT/security team or supervisor, providing all relevant details',
              'Try to fix it all by yourself before telling anyone',
              'Post about it on social media to warn others'
            ],
            correctIndex: 1,
            explanation: 'Prompt reporting enables rapid containment and response.',
            order: 19
          },
          {
            _id: 'quiz40',
            question: 'Which statement best describes "cybersecurity is a team sport" in an organization?',
            options: [
              'Only the IT department handles cybersecurity; others need not worry',
              'Every employee, regardless of role, has a part to play in keeping the organization secure',
              'Cybersecurity responsibilities should rotate among staff weekly',
              'The company should hire a sports team as cybersecurity ambassadors'
            ],
            correctIndex: 1,
            explanation: 'Human behavior across the whole organization—careful clicking, strong passwords, and prompt reporting—forms a collective defense.',
            order: 20
          }
        ]
      }
    ];

    console.log('In-memory database initialized with demo data');
  }

  // User methods
  findUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  findUserById(id) {
    return this.users.find(user => user._id === id);
  }

  createUser(userData) {
    const newUser = {
      _id: `user_${Date.now()}`,
      ...userData,
      createdAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  // Course methods
  getAllCourses() {
    return this.courses;
  }

  findCourseById(id) {
    return this.courses.find(course => course._id === id);
  }

  createCourse(courseData) {
    const newCourse = {
      _id: `course_${Date.now()}`,
      ...courseData,
      createdAt: new Date()
    };
    this.courses.push(newCourse);
    return newCourse;
  }

  deleteCourse(courseId) {
    const courseIndex = this.courses.findIndex(course => course._id === courseId);
    if (courseIndex >= 0) {
      this.courses.splice(courseIndex, 1);
      return true;
    }
    return false;
  }

  // Progress methods
  findUserProgress(userId, courseId) {
    return this.userProgress.find(progress => 
      progress.userId === userId && progress.courseId === courseId
    );
  }

  createUserProgress(progressData) {
    const newProgress = {
      _id: `progress_${Date.now()}`,
      ...progressData,
      createdAt: new Date()
    };
    this.userProgress.push(newProgress);
    return newProgress;
  }

  updateUserProgress(userId, courseId, updates) {
    const progressIndex = this.userProgress.findIndex(progress => 
      progress.userId === userId && progress.courseId === courseId
    );
    
    if (progressIndex >= 0) {
      this.userProgress[progressIndex] = {
        ...this.userProgress[progressIndex],
        ...updates,
        updatedAt: new Date()
      };
      return this.userProgress[progressIndex];
    }
    return null;
  }
}

// Create singleton instance
const db = new InMemoryDB();

module.exports = db;
