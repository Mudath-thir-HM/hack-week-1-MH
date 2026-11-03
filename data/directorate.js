/*
  DIRECTORATE OF PROCUREMENT (ARMY) — content model
  Every fact below is taken from:
    · BRIEF ON THE DIRECTORATE OF PROCUREMENT (establishment, cells, responsibilities a–l)
    · THE BIOGRAPHY OF MAJOR GENERAL SY YAKASAI (Director of Procurement)
  Nothing here is invented. Where the brief is silent, the copy says so.
*/

const DIRECTORATE = {

  meta: {
    army: 'Nigerian Army',
    title: 'Directorate of Procurement',
    established: '06 August 2015',
    act: 'Public Procurement Act 2007',
    director: 'Maj Gen SY Yakasai',
    directorTitle: 'Director of Procurement'
  },

  /* ---------------------------------------------------------------
     MAP NODES — order below is the drawing order on the plate
  ----------------------------------------------------------------*/
  nodes: [

    {
      id: 'coas',
      no: '01',
      kind: 'Authority',
      pin: 'Office of the COAS',
      title: 'Office of the Chief of Army Staff',
      sub: 'The authority the Directorate answers to',
      lede: 'The Directorate exists under the Office of the Chief of Army Staff — and advises it on every procurement matter involving the Army.',
      body: [
        'The Directorate of Procurement was established on 6 August 2015 in accordance with the Public Procurement Act 2007. It operates under the auspices of the Office of the Chief of Army Staff, in liaison with AHQ DAPP and AHQ DOAL.',
        'From that position it offers sound advice to the COAS on all procurement matters involving the Nigerian Army, furnishes him with details of capital projects, the procurement plan for each year and procurement reports — and takes on any other function he directs.'
      ],
      mandate: [
        { k: 'b', t: 'Offer sound advice to the COAS on all procurement matters involving the NA.' },
        { k: 'f', t: 'Furnish the COAS with details of capital projects, procurement plans for each year and procurement reports.' },
        { k: 'l', t: 'Any other function as may be directed by the COAS.' }
      ],
      facts: [
        { k: 'Reports to', v: 'Chief of Army Staff' },
        { k: 'Established', v: '06 August 2015' },
        { k: 'Liaison', v: 'AHQ DAPP · AHQ DOAL' }
      ]
    },

    {
      id: 'dproc',
      no: '02',
      kind: 'Head of Directorate',
      pin: 'The Director',
      title: 'The Director of Procurement',
      sub: 'Maj Gen Sadisu Yahaya Yakasai',
      portrait: 'assets/img/maj-gen-sy-yakasai.jpg',
      portraitName: 'Maj Gen SY Yakasai',
      signature: 'Sadisu Yahaya Yakasai',
      portraitTitle: 'Director of Procurement · Secretary, NA PPC',
      lede: 'One officer answers for every purchase the Army makes.',
      body: [
        'The Directorate is headed by the Director of Procurement, who also sits as Secretary of the Nigerian Army Procurement Planning Committee. Major General Sadisu Yahaya Yakasai was born on 26 June 1974 in Kano Municipal Local Government Area of Kano State, was admitted into the Nigerian Defence Academy in 1992 on 44 Regular Course, and was commissioned into the Infantry Corps in 1997.'
      ],
      mandate: [
        { k: 'b', t: 'Advises the COAS on all procurement matters involving the NA.' },
        { k: 'c', t: 'Formulates policy guidelines and coordinates action with AHQ DAPP, AHQ DOAL and HQ NAFC.' },
        { k: 'g', t: 'Liaises with DHQ, MOD and any other entity on NA procurement matters.' }
      ],
      facts: [
        { k: 'Commissioned', v: '1997 · 44 Regular Course' },
        { k: 'Corps', v: 'Infantry' },
        { k: 'Secretariat', v: 'NA Procurement Planning Committee' }
      ],
      /* long-form blocks, rendered only on this node */
      columns: [
        {
          h: 'Appointments held',
          items: [
            'Platoon Commander, 195 Bn',
            'ADC, Hon Minister of Defence',
            'Commanding Officer, 2 Bn',
            'ADC to the Chief of Army Staff',
            'Directing Staff, AFCSC Jaji',
            'Chief of Staff, 7 Div / Sect 1'
          ]
        },
        {
          h: 'Operations',
          items: [
            'UN Mission in Sierra Leone',
            'Op HARMONY',
            'Op SHARAN DAJI',
            'Op HADIN KAI',
            'Op DESERT SANITY',
            'Op DELTA SAFE'
          ]
        },
        {
          h: 'Honours & qualifications',
          items: [
            'FSS · MSS · DSS',
            'Command Medal · Pass Staff Course (+)',
            'Fellow War College (+)',
            'MSc, National Security & War Studies',
            'MA, Conflict, Security & Development'
          ]
        }
      ],
      rosterTitle: 'Previous directors',
      rosterNote: 'Portraits on file at the Directorate.'
    },

    {
      id: 'hard',
      no: '03',
      kind: 'Main cell',
      pin: 'Hard Procurement',
      title: 'Hard Procurement',
      sub: 'Main cell · headed by a Deputy Director',
      lede: 'The heavy end of the ledger.',
      body: [
        'One of the three main cells of the Directorate, headed by a Deputy Director. It carries the Directorate’s procurement work on the hard side of the Army’s needs — the equipment, materiel and works that keep formations in the field.',
        'The cell works in liaison with the benefitting entity, which is what justifies the needs assessment behind every request. The Directorate handles all Nigerian Army procurement activities on that basis.'
      ],
      mandate: [
        { k: 'd', t: 'Handles all NA procurement activities in liaison with the benefitting entity — to justify the needs assessment.' },
        { k: 'e', t: 'Contributes to the determination of lots, descriptions, cost and specifications.' }
      ],
      facts: [
        { k: 'Cell type', v: 'Main' },
        { k: 'Headed by', v: 'Deputy Director' },
        { k: 'Works with', v: 'Benefitting entity' }
      ]
    },

    {
      id: 'soft',
      no: '04',
      kind: 'Main cell',
      pin: 'Soft Procurement',
      title: 'Soft Procurement',
      sub: 'Main cell · headed by a Deputy Director',
      lede: 'Services, stores and the things an army consumes.',
      body: [
        'The second of the three main cells, headed by a Deputy Director. Soft procurement covers the Directorate’s work on services, stores and consumables — the recurring purchases that keep units running rather than the capital items that equip them.',
        'Like Hard Procurement, it acts in liaison with the benefitting entity so that the need, the specification and the cost can be defended.'
      ],
      mandate: [
        { k: 'd', t: 'Handles NA procurement activities in liaison with the benefitting entity.' },
        { k: 'e', t: 'Contributes to lots, descriptions, cost, specifications and bills of quantity.' }
      ],
      facts: [
        { k: 'Cell type', v: 'Main' },
        { k: 'Headed by', v: 'Deputy Director' },
        { k: 'Works with', v: 'Benefitting entity' }
      ]
    },

    {
      id: 'atb',
      no: '05',
      kind: 'Main cell',
      pin: 'Tenders Board / Works',
      title: 'Army Tenders Board / Works & Services',
      sub: 'Main cell · headed by a Deputy Director',
      lede: 'Where a contract is opened, weighed and closed.',
      body: [
        'The third main cell carries the tenders board function together with works and services. It is where the procedures for award, evaluation, monitoring and termination of contracts — as approved by the Procurement Planning Committee — are enforced.',
        'It also determines the lots of the various jobs, their descriptions, cost and specifications, and the Bill of Quantity that a tender is priced against.'
      ],
      mandate: [
        { k: 'e', t: 'Determines the lots of various jobs, their descriptions, cost and specifications, and Bill of Quantity.' },
        { k: '—', t: 'Enforces procedures for award, evaluation, monitoring and termination of contracts approved by the PPC.' }
      ],
      facts: [
        { k: 'Cell type', v: 'Main' },
        { k: 'Headed by', v: 'Deputy Director' },
        { k: 'Enforces', v: 'Award · evaluation · monitoring · termination' }
      ]
    },

    {
      id: 'ppc',
      no: '06',
      kind: 'Secretariat',
      pin: 'NA PPC',
      title: 'NA Procurement Planning Committee',
      sub: 'The Directorate serves as its Secretariat',
      lede: 'The committee approves. The Directorate keeps its papers.',
      body: [
        'The Directorate acts as Secretariat of the Nigerian Army Procurement Planning Committee, with the Director of Procurement as its Secretary. Contracts approved by the committee are the contracts the Directorate then enforces, monitors and, where necessary, terminates.',
        'The Directorate also takes an active part in the preparation and implementation of the Nigerian Army budget.'
      ],
      mandate: [
        { k: 'a', t: 'Act as Secretariat of the NA PPC, with the D Proc as the Secretary.' },
        { k: '—', t: 'Take an active part in the preparation and implementation of the NA budget.' }
      ],
      facts: [
        { k: 'Role', v: 'Secretariat' },
        { k: 'Secretary', v: 'Director of Procurement' },
        { k: 'Approves', v: 'Contracts the Directorate enforces' }
      ]
    },

    {
      id: 'support',
      no: '07',
      kind: 'Supporting cells',
      pin: 'Finance · Legal · Compliance',
      title: 'Supporting Cells',
      sub: 'Finance · Legal · Compliance — overseen by Assistant Directors',
      lede: 'Three cells that hold the main cells to the law.',
      body: [
        'Alongside the three main cells sit three supporting cells: Finance, Legal and Compliance. Each is overseen by an Assistant Director rather than a Deputy Director, and each supports the procurement work of the Directorate.',
        'The establishment order names the three cells and their oversight. It does not set out a separate mandate for each supporting cell.'
      ],
      mandate: [
        { k: '—', t: 'Finance cell — oversight by an Assistant Director.' },
        { k: '—', t: 'Legal cell — oversight by an Assistant Director.' },
        { k: '—', t: 'Compliance cell — oversight by an Assistant Director.' }
      ],
      facts: [
        { k: 'Cell type', v: 'Supporting' },
        { k: 'Overseen by', v: 'Assistant Directors' },
        { k: 'Count', v: 'Three cells' }
      ]
    },

    {
      id: 'foundation',
      no: '08',
      kind: 'Establishment',
      pin: 'The foundation',
      title: 'Established 6 August 2015',
      sub: 'Public Procurement Act 2007',
      lede: 'The Directorate was not created by the Army alone. It was created by law.',
      body: [
        'The Directorate of Procurement (Army) was established on 6 August 2015 in accordance with the provisions of the Public Procurement Act 2007. The Act is the reason the Directorate exists in its present form, and the standard every award it makes is measured against.',
        'It operates under the auspices of the Office of the COAS, in liaison with AHQ DAPP and AHQ DOAL, and formulates policy guidelines and coordinates action on all procurement matters with those departments and HQ NAFC.'
      ],
      mandate: [
        { k: 'c', t: 'Formulate policy guidelines and coordinate action on procurement matters with AHQ DAPP, AHQ DOAL and HQ NAFC.' },
        { k: 'g', t: 'Liaise with DHQ, MOD and any other entity on NA procurement matters.' }
      ],
      facts: [
        { k: 'Established', v: '06 August 2015' },
        { k: 'Under', v: 'Public Procurement Act 2007' },
        { k: 'Liaison', v: 'DAPP · DOAL · NAFC · DHQ · MOD' }
      ]
    },

    {
      id: 'portal',
      no: '09',
      kind: 'System',
      pin: 'Procurement Portal',
      title: 'NA Procurement Portal',
      sub: 'Opening and managing — when established',
      lede: 'A duty waiting on a system.',
      body: [
        'Among the Directorate’s responsibilities is the opening and managing of a Nigerian Army Procurement Portal, when established. The establishment order places the portal inside this Directorate rather than in a separate agency.',
        'Until the portal exists, procurement activity is run through the cells and the tenders board in the ordinary way.'
      ],
      mandate: [
        { k: 'h', t: 'Opening and managing of the NA Procurement Portal, when established.' }
      ],
      facts: [
        { k: 'Status', v: 'When established' },
        { k: 'Owner', v: 'Directorate of Procurement' },
        { k: 'Duty', v: 'Open and manage' }
      ]
    },

    {
      id: 'registry',
      no: '10',
      kind: 'System',
      pin: 'Contractor Registry',
      title: 'Contractor Registry',
      sub: 'Registering intending contractors',
      lede: 'Before a company can tender, it must be on the list.',
      body: [
        'The Directorate registers intending contractors with the Nigerian Army. Registration is the gate that stands in front of the tenders board: a company that is not registered cannot be evaluated for an Army contract.',
        'The registry is kept by the Directorate itself, which is what allows it to enforce the procedures for award, evaluation, monitoring and termination.'
      ],
      mandate: [
        { k: 'i', t: 'Register intending contractors with the NA.' }
      ],
      facts: [
        { k: 'Held by', v: 'Directorate of Procurement' },
        { k: 'Applies to', v: 'Intending contractors' },
        { k: 'Precedes', v: 'Tender and evaluation' }
      ]
    }
  ],

  /* ---------------------------------------------------------------
     PORTRAITS SUPPLIED BY THE DIRECTORATE
     Yakasai is the serving Director. The remaining portraits were
     supplied in the same set; their order and designation must be
     confirmed before this is treated as a formal roll.
  ----------------------------------------------------------------*/
  roster: [
    { name: 'Maj Gen UT Otaru', img: 'assets/img/maj-gen-ut-otaru.jpg' },
    { name: 'Maj Gen AA Adereti', img: 'assets/img/maj-gen-aa-adereti.jpg' },
    { name: 'Maj Gen AG Ibrahim', img: 'assets/img/maj-gen-ag-ibrahim.jpg' },
    { name: 'Maj Gen NU Muktar', img: 'assets/img/maj-gen-nu-muktar.jpg' },
    { name: 'Brig Gen AJ Aliyu', img: 'assets/img/brig-gen-aj-aliyu.jpg' },
    { name: 'Brig Gen EF Edafioghor', img: 'assets/img/brig-gen-ef-edafioghor.jpg' },
    { name: 'Brig Gen ET Essien', img: 'assets/img/brig-gen-et-essien.jpg' },
    { name: 'Brig Gen KO Ukandu', img: 'assets/img/brig-gen-ko-ukandu.jpg' },
    { name: 'Brig Gen M Danmadami', img: 'assets/img/brig-gen-m-danmadami.jpg' },
    { name: 'Brig Gen OO Olatunde', img: 'assets/img/brig-gen-oo-olatunde.jpg' }
  ]
};
