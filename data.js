/* Original plain-language teaching summaries. The classic catalog is bounded to the 23 GoF patterns. */
const patternRows = [
['Factory Method','Creational','Component','Let a specialised creator decide which kind of object to make.','Different exporters share one export workflow, but create PDF or CSV writers.','Use when subclasses genuinely vary creation. A simple factory function is often enough.','Separate the export workflow from writer creation. Explain why a factory method is preferable to a plain function.'],
['Abstract Factory','Creational','Component','Create a matching family of related objects together.','A light-theme factory supplies matching buttons, dialogs and menus.','Useful for compatible product families; excessive for one interchangeable object.','Group related theme components behind a family factory; prevent mixing incompatible families.'],
['Builder','Creational','Component','Assemble a complex result in clear, optional steps.','Build a report with a title, selected sections, charts and an appendix.','Use for many configuration choices; prefer a simple configuration object if it stays clear.','Design a stepwise report builder and validate required fields before producing the report.'],
['Prototype','Creational','Component','Create a new object by copying an existing example.','Duplicate a configured drawing component instead of rebuilding every setting.','Clarify deep versus shallow copies so nested mutable data is not accidentally shared.','Support cloning a configured item; test that changing the clone does not change the original.'],
['Singleton','Creational','Process','Restrict a class to one instance in a given process.','A process-wide configuration registry.','Hidden global state harms isolation and tests. It is not one instance across servers. Prefer injected dependencies.','Check whether a single shared instance is required. Prefer explicit dependency injection over hidden global state.'],
['Adapter','Structural','Boundary','Translate one interface into the interface your app expects.','Wrap a payment vendor so the app keeps the same pay/refund interface.','Use for incompatible interfaces; do not hide differences in guarantees or error behaviour.','Wrap the external provider with an adapter and translate its errors into explicit application outcomes.'],
['Bridge','Structural','Component','Separate two independent dimensions so each can change on its own.','Report types vary independently of PDF, HTML and print rendering.','Helpful for two growing dimensions; adds indirection when there is only one.','Separate report content types from rendering implementations using composition.'],
['Composite','Structural','Component','Treat individual items and groups through the same interface.','A folder contains files and more folders; each can report its total size.','Use for tree structures. Define ownership and prevent cycles where a tree is expected.','Model leaves and groups uniformly and test nested groups and empty groups.'],
['Decorator','Structural','Component','Wrap an object to add behaviour without changing its core.','Add compression and encryption around a file writer.','Wrapper order matters. Too many layers make behaviour hard to follow.','Add optional logging around the service without changing its business logic; make wrapper order explicit.'],
['Facade','Structural','Boundary','Offer one simple doorway into several complicated subsystems.','A checkout service coordinates stock, payment and order creation.','Simplifies entry points but must not become a giant module with every responsibility.','Provide a small checkout interface while keeping inventory and payment rules in their own modules.'],
['Flyweight','Structural','Component','Share immutable common data across many small objects.','Thousands of map markers share one icon resource but retain separate positions.','Use after measuring memory pressure. Keep each instance’s changing state outside the shared object.','Identify immutable repeated data worth sharing and measure memory before and after the change.'],
['Proxy','Structural','Boundary','Stand in for another object to control access or defer work.','Load a large image only when it is needed.','Remote and caching proxies introduce latency or stale data; make these behaviours visible.','Place a proxy around expensive loading and document caching, permissions and failure behaviour.'],
['Chain of Responsibility','Behavioural','Component','Pass a request through potential handlers until one handles it.','A support ticket escalates from automated help to an agent to a specialist.','Define ordering and what happens when no handler accepts the request.','Create explicit request handlers with a defined fallback and tests for handler order.'],
['Command','Behavioural','Component','Represent an action as an object or message.','An editor stores move and delete actions to support undo.','Undo may require captured state; external payments cannot simply be undone like text edits.','Represent editor actions as commands with explicit undo rules and failure outcomes.'],
['Interpreter','Behavioural','Component','Represent a small language’s grammar and evaluate its expressions.','Evaluate simple eligibility expressions such as age > 18 AND verified.','For complex languages, prefer a mature parser. Never evaluate untrusted input as executable code.','Define a small, bounded rule grammar and reject unknown operators instead of executing arbitrary expressions.'],
['Iterator','Behavioural','Component','Visit items in a collection without exposing its internal structure.','Read paginated records one at a time through one traversal interface.','Use built-in iterators first. Define behaviour if the collection changes during traversal.','Expose a traversal interface and test empty data, final pages and cancellation.'],
['Mediator','Behavioural','Component','Coordinate interactions through a central collaborator.','A form coordinator enables fields when other selections change.','Reduces many-to-many coupling, but the coordinator can grow into a god object.','Coordinate form interactions in one focused mediator without moving validation rules out of their domain.'],
['Memento','Behavioural','Component','Capture a restorable snapshot without exposing internal details.','Save a document state before a major edit.','Snapshots can be expensive or contain sensitive information; specify retention and compatibility.','Add restorable document snapshots and define storage limits and version compatibility.'],
['Observer','Behavioural','Component','Notify subscribed listeners when something changes.','A local model change refreshes several views.','Unsubscribe when listeners are no longer needed. Define error and notification order. Distributed pub/sub adds different guarantees.','Notify subscribed UI views of model changes and clean up listeners when views are destroyed.'],
['State','Behavioural','Component','Change behaviour according to an object’s explicit current state.','An order allows payment while pending but only tracking after shipment.','Use for lifecycle-dependent rules; define legal transitions and reject illegal ones.','Model order states explicitly, list allowed transitions and test rejected transitions.'],
['Strategy','Behavioural','Component','Swap one method of doing a job for another behind one interface.','Choose flat-rate, distance-based or express shipping calculations.','Use when algorithms vary independently; a small conditional is fine for trivial fixed choices.','Separate shipping algorithms behind one interface and test each against independently specified examples.'],
['Template Method','Behavioural','Component','Fix the steps of a workflow while allowing selected steps to vary.','Import always reads, validates and saves, but file parsing differs.','Inheritance couples variants to a base workflow; composition may be easier to change.','Define stable import steps and vary only parsing; compare inheritance with a composed strategy.'],
['Visitor','Behavioural','Component','Add operations to a stable family of types without putting every operation in each type.','Run validation and export over the same document element tree.','Easy to add operations, harder to add element types; use only when that tradeoff fits.','Keep document element types stable and implement separate traversal operations; explain the cost of adding a new element type.']
];
const principles = [
['Single responsibility (S)','SOLID','Module','Give a module one coherent reason to change.','Keep invoice pricing rules separate from email delivery.','Not one function per class. Group things that change for the same business reason.'],
['Open/closed (O)','SOLID','Module','Allow expected variations without repeatedly rewriting stable logic.','Add a new shipping strategy without editing the checkout calculation.','Do not build extension points for every imagined future.'],
['Liskov substitution (L)','SOLID','Contract','A replacement must honour the promises of the original interface.','A replacement file store preserves read/write guarantees and documented errors.','Matching method names is not enough; preconditions, results and failure behaviour matter.'],
['Interface segregation (I)','SOLID','Contract','Give callers only the capabilities they actually need.','A report viewer needs reading, not delete-user and billing methods.','Avoid both huge catch-all interfaces and meaningless one-method fragmentation.'],
['Dependency inversion (D)','SOLID','Architecture','Business policy should depend on contracts, not vendor details.','Order rules use a payment interface; a Stripe adapter supplies its implementation.','Dependency injection is one way to wire this, not the whole principle.'],
['DRY','Simplicity','Module','Keep each piece of business knowledge in one authoritative place.','Define a tax rule once instead of copying it into three screens.','Similar-looking code may represent different rules. Premature merging creates the wrong abstraction.'],
['KISS','Simplicity','System','Choose the simplest design that meets the actual requirements.','One deployable app instead of six services for a small booking system.','Simple does not mean omitting validation, security or failure handling.'],
['YAGNI','Simplicity','Product','Build capabilities when there is a justified need.','Skip a plugin marketplace until real integrations require it.','Required safety, privacy and recovery controls are not speculative features.'],
['Separation of concerns','Structure','Architecture','Keep different kinds of responsibility distinct.','Display logic, business rules and database operations have clear boundaries.','A folder structure alone does not enforce boundaries.'],
['High cohesion / low coupling','Structure','Module','Keep related behaviour together and dependencies narrow.','Stock reservation rules live together; checkout calls a small public interface.','Zero coupling is impossible. Aim for understandable dependencies.'],
['Composition over inheritance','Structure','Component','Assemble behaviour from collaborators before creating deep family trees.','A report uses a renderer rather than inheriting many report-format combinations.','Inheritance is useful when a genuine stable substitution relationship exists.'],
['Encapsulation','Structure','Module','Protect internal state with a clear public interface.','Change an account balance through validated operations, not arbitrary field writes.','Getters and setters alone do not protect business invariants.'],
['Least privilege','Security','System','Grant only the permissions needed, for only as long as needed.','An export worker can read reports but cannot administer users.','Enforce permissions on the server; hidden buttons are not access control.'],
['Defence in depth','Security','System','Use independent layers so one failure does not expose everything.','Authorisation, validation, network boundaries and audit logs serve different roles.','Several copies of the same broken check are not independent layers.'],
['Fail securely','Security','Boundary','When a security decision fails, deny access rather than guessing approval.','An unavailable permission service does not silently allow an admin action.','Define recovery and availability needs; do not swallow failures.'],
['Explicit contracts','Reliability','Boundary','State inputs, outputs, units, errors and guarantees clearly.','A calculation API declares millimetres, amperes, valid ranges and rounding.','Types do not prove units, correctness or external data validity.'],
['Idempotency','Reliability','Operation','Repeating the same intended operation has the same effect.','A retried payment request with the same key does not charge twice.','Requires durable deduplication and defined key scope; a disabled UI button is insufficient.'],
['Design by contract','Reliability','Module','Specify what must be true before, after and throughout an operation.','A withdrawal preserves balance rules and changes the ledger consistently.','Assertions alone may be disabled or bypassed. Validate external input at boundaries.'],
['Boy Scout rule','Maintenance','Change','Leave touched code a little clearer than you found it.','Rename a confusing variable while fixing a nearby defect.','Keep cleanup bounded so a small fix does not become an unreviewable rewrite.'],
['Law of Demeter','Structure','Module','Talk to direct collaborators instead of reaching deep into their internals.','Ask an order for its delivery country rather than navigating five nested objects.','Do not add pointless forwarding methods just to satisfy a mechanical rule.']
];
const architecture = [
['Modular monolith','Architecture','System','One deployable application with clear internal business modules.','A small SaaS separates accounts, billing and projects inside one application.','A practical starting point. Enforce boundaries or it becomes tangled.'],
['Layered architecture','Architecture','System','Separate presentation, application rules and data access into layers.','A screen calls an application service, which uses a persistence interface.','Do not let domain rules leak into UI and SQL in inconsistent copies.'],
['Hexagonal / ports & adapters','Architecture','System','Put business logic inside, with explicit interfaces to the outside world.','Test calculation rules without a real database, web server or payment vendor.','Useful for important rules and multiple integrations; extra interfaces have a cost.'],
['MVC / MVVM','Architecture','UI','Separate presentation from application state and interaction logic.','A view displays a model; a controller or view model coordinates interaction.','MVC and MVVM differ; modern reactive frameworks do not map perfectly onto either.'],
['Microservices','Architecture','System','Independently deploy services around business capabilities.','Separate teams independently operate catalog and fulfilment services.','Adds distributed failures, observability, consistency and deployment costs. Not a default upgrade.'],
['Event-driven architecture','Architecture','System','Publish facts so other components can react asynchronously.','An order-created event starts fulfilment and analytics independently.','Plan duplicate delivery, ordering, schema evolution, lag and replay.'],
['Repository','Data & resilience','Boundary','Offer a domain-focused interface to stored data.','Find available bookings without spreading storage queries through the UI.','An ORM may already provide enough abstraction. Do not wrap it without a reason.'],
['Unit of work / transaction','Data & resilience','Operation','Commit related database changes together or roll them back together.','Write an order and its line items atomically.','A local database transaction cannot atomically roll back an external payment.'],
['CQRS','Data & resilience','System','Separate how data is changed from how it is read.','A reporting view is optimised separately from order commands.','Can share one database. Adds complexity; it does not require event sourcing.'],
['Saga','Data & resilience','System','Coordinate a multi-service workflow using steps and compensating actions.','Cancel a reservation when a later payment step fails.','Compensation is a business action, not a guaranteed reversal of history.'],
['Transactional outbox','Data & resilience','Boundary','Store a change and a pending event in the same database transaction.','Save an order plus an outbox record; a worker later publishes the event.','Publishing can repeat. Consumers still need deduplication and failure monitoring.'],
['Circuit breaker','Data & resilience','Boundary','Temporarily stop calls to a failing dependency to let it recover.','Pause calls to an unavailable delivery provider and report a clear fallback.','Tune timeouts and recovery probes; do not conceal failed operations.'],
['Retry with backoff','Data & resilience','Boundary','Retry transient failures with increasing delays and jitter.','Retry a temporary network error within a bounded time budget.','Unsafe operations can duplicate effects. Combine with idempotency and retry limits.'],
['Cache-aside','Data & resilience','Boundary','Read a cache first, fetch missing data and refresh the cache deliberately.','Cache a slow product catalog query.','Decide expiry and invalidation. Stale balances or permissions can cause serious errors.']
];
const tests = [
['Unit tests','Logic','Does one small rule behave correctly?','Check pricing boundaries, invalid inputs and rounding using independent expected results.','Vitest / Jest (JS), pytest (Python), xUnit (.NET).','Fast feedback; mocks cannot establish that integrations work.'],
['Integration tests','Boundaries','Do real parts work together?','Test transactions against a disposable database and verify vendor adapters in a sandbox.','Testcontainers, pytest, framework test clients.','Include migrations, constraints, timeouts and rollback paths.'],
['Contract tests','Boundaries','Do producers and consumers agree?','Check request/response schemas and version compatibility.','Pact, OpenAPI validators, schema tests.','A matching schema does not establish correct business behaviour.'],
['End-to-end tests','User journey','Can a user complete the important workflow?','Sign in, create an order and verify the result using isolated test accounts.','Playwright / Cypress.','Use a small reliable set; never run destructive flows on real customer data.'],
['Property-based tests','Logic','Which rules must always hold?','For valid values, a transfer preserves total funds and never creates money.','Hypothesis (Python), fast-check (JS).','Define meaningful invariants; random inputs without an oracle are weak.'],
['Boundary & decision-table tests','Logic','Did we exercise the edges and combinations?','Test below, at and above a limit; test each role/action/resource combination.','Parameterized test tables.','Include empty, null, overflow, dates, time zones, units and rounding.'],
['Security testing','Security','Can users access or change anything they should not?','Test cross-tenant access, session expiry, malicious uploads and injection.','SAST: CodeQL / Semgrep; DAST: OWASP ZAP; dependency and secret scanners.','Scan findings need triage. Independent penetration testing is separate evidence.'],
['Performance & resilience','Operations','What happens under load or partial failure?','Measure response times at expected concurrency; interrupt dependencies and test recovery.','k6 / Locust, controlled fault injection.','Load tests need a defined workload and a non-production environment.'],
['Accessibility testing','User journey','Can people use this with different abilities and tools?','Test keyboard navigation, zoom, labels, contrast and a screen reader.','axe-core / axe DevTools plus manual checks.','Automated scans cover only part of accessibility.'],
['Exploratory & acceptance tests','User journey','Is this the right product and does it handle surprising use?','A domain user follows realistic tasks and explores unusual sequences.','Session notes, acceptance examples, defect reports.','User acceptance does not replace security or engineering verification.'],
['Regression & mutation testing','Logic','Would the suite catch an introduced mistake?','Re-run past defect cases; deliberately alter logic and see whether tests fail.','Regression suite; Stryker (JS) / mutmut (Python).','Coverage counts executed code, not whether assertions detect wrong behaviour.'],
['AI-assisted QA','AI workflow','Can AI help find missing cases and explain failures?','Give AI requirements and ask for adversarial cases before implementation; retain reproducible tests.','AI test drafts, diff review, log clustering, browser exploration.','AI may share the implementation’s misunderstanding. A separate chat is not independent assurance.']
];
const compliance = [
['ISO/IEC 27001','International standard','General SaaS','Organisation-wide information security management.','Applicable when security governance or customer contracts call for an ISMS.','Risk register, controls, access reviews, incidents and audit evidence. Certification has a defined organisational scope; it does not certify bug-free code.','https://www.iso.org/standard/27001'],
['SOC 2','Assurance report','General SaaS','A CPA examination of service-organisation controls against applicable Trust Services Criteria.','Often requested by business customers; a US-origin assurance framework used internationally.','System scope, control evidence and auditor report. Type I addresses a point in time; Type II covers operation over a period. It is not a law or product certification.','https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services'],
['GDPR','Law / regulation','Personal data','EU personal-data protection law with defined territorial and material scope.','EU/EEA establishment, or certain offering of goods/services to or monitoring of people in the EU; assess Article 3.','Lawful basis, data inventory, rights handling, retention, processor terms, security and transfer assessment. Consent is not the only lawful basis.','https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng'],
['HIPAA','Law / regulation','Healthcare','US health-data rules for covered entities and business associates.','When handling protected health information in a covered relationship; not every health app.','Risk analysis, safeguards, access controls and required business associate arrangements. A cloud vendor’s eligibility does not make an app compliant.','https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html'],
['PCI DSS','Industry standard','Payments / ATM','Protect payment account data and the cardholder-data environment.','Systems storing, processing or transmitting cardholder data, and systems that can affect that environment.','Document scope and responsibilities with the acquirer/assessor; collect required validation evidence. Hosted checkout can reduce scope, not automatically eliminate obligations.','https://www.pcisecuritystandards.org/document_library/'],
['PCI PIN / PTS / HSM','Industry standard','Payments / ATM','PIN handling, payment devices and cryptographic hardware have specialised requirements.','ATM and payment designs must assess which PCI standards, network rules and local banking rules apply.','Approved-device evidence, key-management procedures, secure integration and scheme/bank acceptance. This is beyond a web-app security checklist.','https://www.pcisecuritystandards.org/standards/'],
['OWASP ASVS','Verification standard','General SaaS','A structured set of application security requirements.','Web applications and APIs; choose the requirement set and assurance depth to fit risk.','Trace applicable ASVS requirements to implementation, tests and review evidence. ASVS 5.0.0 is a verification reference, not a legal certificate.','https://asvs.owasp.org/'],
['NIST SSDF','Practice framework','General SaaS','Secure development practices to integrate into the lifecycle.','Teams establishing secure software development or meeting procurement expectations.','Security responsibilities, protected source/builds, vulnerability prevention and response. Use the final 1.1 reference; distinguish later drafts from final publications.','https://csrc.nist.gov/pubs/sp/800/218/final'],
['WCAG 2.2','Web standard','Accessibility','Testable criteria for accessible web content.','Use an agreed conformance target; laws and contracts specify which version and level apply.','Automated and manual evaluation, assistive-technology testing and defect resolution. A clean automated scan is not proof of conformance.','https://www.w3.org/TR/WCAG22/'],
['IEC 62304','International standard','Healthcare','Software lifecycle processes for medical device software.','Medical device software, alongside applicable device regulation and risk-management requirements.','Software plans, requirements, architecture, verification, maintenance and traceability. The standard is not itself market authorisation for a medical device.','https://www.iso.org/standard/38421.html'],
['IEC 61508','International standard','Functional safety','Functional safety of electrical/electronic/programmable electronic safety-related systems.','Safety-related industrial systems where this standard or a sector derivative is applicable.','Hazard/risk analysis, safety requirements, lifecycle evidence and assessment appropriate to the system. Not a generic certification for every industrial app.','https://webstore.iec.ch/en/publication/5515'],
['ISO 26262','International standard','Functional safety','Functional safety of safety-related E/E systems in road vehicles.','Automotive projects within scope; software development is addressed in Part 6.','Safety classification, requirements traceability, verification and tool considerations within the overall safety lifecycle. Not interchangeable with IEC 61508.','https://www.iso.org/standard/68388.html']
];
const methods = [
['Iterative / incremental','Evolving product','Deliver a small working slice, learn from use and improve in short loops.','Recommended starting approach for ordinary AI-assisted web products. Keep requirements, tests, review and recovery in every loop.','Avoid uncontrolled changes and endless prototyping without acceptance criteria.'],
['Scrum','Product team','An Agile framework with accountabilities, events and artifacts around a Sprint Goal.','Useful when a team benefits from a shared cadence and regular inspection. It is a framework, not the entire SDLC.','Calling daily meetings “Scrum” does not supply design, testing or release controls.'],
['Kanban','Continuous work','Visualise work, limit work in progress and improve flow.','Fits small teams, support work and frequent incoming requests. Can be combined with other lifecycle practices.','A board without explicit policies or work limits misses much of the value.'],
['Waterfall / predictive','Stable scope','Plan and approve work in relatively sequential phases.','Useful with genuinely stable requirements, contractual milestones or defined handoffs.','Late feedback makes misunderstandings expensive; plan validation early.'],
['V-model','High assurance','Link each requirements/design level to corresponding verification and validation.','Useful for traceability and planned assurance in regulated or safety-related contexts. Can include iterations.','A V-shaped diagram is not evidence that verification happened.'],
['Spiral / risk-driven','Uncertain high risk','Repeat cycles that explicitly identify and retire the biggest risks.','Useful for large uncertainties, unfamiliar technology or expensive failure consequences.','Needs disciplined risk analysis and decision ownership.'],
['DevOps / DevSecOps','Delivery practices','Connect development, security and operations through automation and feedback.','Combine with a lifecycle model; use CI/CD, monitoring, vulnerability response and shared ownership.','Not a replacement for a lifecycle model, and not just buying a pipeline tool.']
];
const sources = [
['Security','OWASP ASVS 5.0.0','https://asvs.owasp.org/','Application security requirements and verification.'],
['Security','NIST SSDF 1.1 (final)','https://csrc.nist.gov/pubs/sp/800/218/final','Secure development practices; later draft revisions are not treated as final here.'],
['Governance','ISO/IEC 27001','https://www.iso.org/standard/27001','ISMS scope and organisational requirements.'],
['Governance','AICPA SOC services','https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services','Assurance reporting and control examinations.'],
['Privacy','EU GDPR legal text','https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng','Use the actual regulation to determine obligations.'],
['Healthcare','HHS HIPAA scope','https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html','Covered entities and business associates.'],
['Payments','PCI standards library','https://www.pcisecuritystandards.org/document_library/','Current documents, versions and scope.'],
['Payments','PCI standards overview','https://www.pcisecuritystandards.org/standards/','DSS, PIN, PTS and related standards.'],
['Accessibility','W3C WCAG 2.2','https://www.w3.org/TR/WCAG22/','Normative conformance criteria.'],
['Safety','IEC 62304 scope','https://www.iso.org/standard/38421.html','Medical device software lifecycle processes.'],
['Safety','IEC 61508-1 scope','https://webstore.iec.ch/en/publication/5515','Functional safety general requirements.'],
['Safety','ISO 26262-6 scope','https://www.iso.org/standard/68388.html','Automotive software-level development.'],
['Design','Microsoft cloud patterns','https://learn.microsoft.com/en-us/azure/architecture/patterns/','Further reading for distributed-system patterns.'],
['Design','Design Patterns, Gamma et al.','https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-9780201633610','The classic 23-pattern catalog; summaries here are original explanations.'],
['Delivery','Agile Manifesto principles','https://agilemanifesto.org/principles.html','Foundational principles; not a mandated universal lifecycle.'],
['Delivery','The Scrum Guide','https://scrumguides.org/scrum-guide.html','Framework definition.'],
['Automation','GitHub Actions documentation','https://docs.github.com/en/actions/get-started/understand-github-actions','Workflow concepts and CI/CD automation.'],
['Testing','Playwright documentation','https://playwright.dev/docs/intro','Browser testing and CI setup.'],
['Stacks','React project guidance','https://react.dev/learn/creating-a-react-app','Framework and app setup tradeoffs.'],
['Stacks','FastAPI features','https://fastapi.tiangolo.com/features/','Python API framework capabilities.'],
['Data','PostgreSQL transaction isolation','https://www.postgresql.org/docs/current/transaction-iso.html','Concurrency guarantees and retry considerations.']
];
const gateGroups = [
['Define the job',[
['requirements','Write acceptance examples','Named users, required outcomes, failure cases and out-of-scope features.'],
['risk','Classify the consequences of failure','Identify money, personal data, safety, hardware and regulatory exposure.'],
['design','Record the design decision','Module boundaries, data ownership, API contracts, units and rejected alternatives.']]],
['Prove the behaviour',[
['tests','Run requirement-based tests','Independent expected results, edge cases, integration and critical user journeys.'],
['auth','Check security boundaries','Authentication, server-side authorisation, tenant isolation and abuse cases.'],
['review','Get a human review appropriate to risk','A reviewer understands the changed code and its domain consequences.'],
['dependencies','Review dependencies and secrets','Supported packages, licences, vulnerability triage and no committed credentials.']]],
['Prepare to operate',[
['restore','Demonstrate recovery','Restore a backup, test rollback or roll-forward, and plan irreversible data changes.'],
['observe','Make failures visible','Useful logs without secrets, metrics, alerts and an accountable responder.'],
['release','Approve release with evidence','Required compliance review, staged validation, unresolved risks and named owner.']]]
];
compliance.push(
['ISO 9001','International standard','Quality & lifecycle','Requirements for an organisational quality management system.','When customer contracts or quality-governance needs require a QMS; assess the applicable edition and transition arrangements.','Defined processes, responsibilities, internal audits, corrective actions and improvement evidence. QMS certification does not establish that each software product is defect-free.','https://www.iso.org/standards/popular/iso-9000-family'],
['ISO/IEC 25010','Quality model','Quality & lifecycle','A reference model for specifying and evaluating software and ICT product quality.','When defining measurable quality attributes alongside functional requirements.','Explicit quality criteria and evaluation measures. It is a quality model, not a universal regulatory approval or a promise of zero defects.','https://www.iso.org/standard/78176.html'],
['ISO/IEC/IEEE 12207','International standard','Quality & lifecycle','A common framework of software lifecycle processes.','When establishing or agreeing processes across acquisition, development, operation, maintenance and disposal.','Tailored process definitions, responsibilities and lifecycle records. It does not mandate one universal sequence such as Waterfall or Scrum.','https://www.iso.org/standard/90219.html']
);
sources.push(
['Quality','ISO 9000 family','https://www.iso.org/standards/popular/iso-9000-family','Quality management scope; check ISO 9001 edition and transition requirements.'],
['Quality','ISO/IEC 25010:2023','https://www.iso.org/standard/78176.html','Product quality model for specifying and evaluating quality.'],
['Lifecycle','ISO/IEC/IEEE 12207:2026','https://www.iso.org/standard/90219.html','Common software lifecycle processes, including operation and disposal.']
);
const glossary=[
['Module','A part of the application with a coherent responsibility and a defined way for other parts to use it.'],
['API / interface','An agreed way for one part of software to ask another part to do something. It includes inputs, results and error behaviour.'],
['Contract','The promises at a boundary: accepted inputs, expected outputs, constraints and failure outcomes.'],
['Dependency','Something your code relies on, such as another module, a package, a database or a remote service.'],
['Dependency injection','Supplying a collaborator from outside rather than having a module secretly construct or locate it.'],
['Invariant','A rule that must remain true, such as “the same payment intent must not create two charges.”'],
['Test oracle','The trusted basis for deciding whether a result is correct, such as an independently calculated expected value.'],
['CI','Continuous integration: frequently combine small changes and run automated checks.'],
['CD','Continuous delivery keeps changes ready to release. Continuous deployment automatically releases changes that pass the required gates.'],
['Pull request / diff','A proposed change for review, and the exact added, removed and changed lines.'],
['Artifact','The built output you test and deploy, such as a packaged application or static website.'],
['Migration','A controlled change to stored data or database structure, with a plan for existing records and failure recovery.'],
['Observability','Using logs, metrics and traces to understand what a running system is doing and why it fails.'],
['Idempotency','Designing an operation so repeating the same intended request does not repeat its effect.'],
['Traceability','Links from a requirement to the design, implementation and verification evidence that address it.'],
['Verification / validation','Verification checks against specified requirements. Validation checks suitability for the intended use and user need.']
];

// Teaching snippets: Python 3.12 / Node.js 24. Never executed by the page.
const codeExamples = {
  "p0": {
    "summary": "The base workflow uses a writer supplied by a specialised creator. The creation step is what varies.",
    "python": "class Exporter:\n    def make_writer(self):\n        raise NotImplementedError\n    def export(self, text):\n        return self.make_writer()(text)\n\nclass PdfExporter(Exporter):\n    def make_writer(self):\n        return lambda text: f\"PDF: {text}\"\n\nassert PdfExporter().export(\"invoice\") == \"PDF: invoice\"\nprint(\"PDF: invoice\")\n",
    "javascript": "class Exporter {\n  makeWriter() { throw new Error(\"Implement creation\"); }\n  export(text) { return this.makeWriter()(text); }\n}\nclass PdfExporter extends Exporter {\n  makeWriter() { return text => `PDF: ${text}`; }\n}\nconst result = new PdfExporter().export(\"invoice\");\nif (result !== \"PDF: invoice\") throw new Error(\"Wrong writer\");\nconsole.log(result);\n",
    "output": "PDF: invoice",
    "limit": "This returns labelled text; it does not generate a real PDF. A plain factory function is simpler when subclass variation is unnecessary.",
    "verification": "runnable",
    "use": "Creator subclasses need to select a product while sharing a stable workflow.",
    "avoid": "Creation is one fixed choice or a small configuration switch; use a constructor or plain factory function."
  },
  "p1": {
    "summary": "One factory creates both members of a matching theme family.",
    "python": "class LightTheme:\n    def button(self): return {\"kind\": \"button\", \"theme\": \"light\"}\n    def menu(self): return {\"kind\": \"menu\", \"theme\": \"light\"}\n\nclass DarkTheme:\n    def button(self): return {\"kind\": \"button\", \"theme\": \"dark\"}\n    def menu(self): return {\"kind\": \"menu\", \"theme\": \"dark\"}\n\ndef build_screen(factory):\n    return factory.button(), factory.menu()\n\nbutton, menu = build_screen(DarkTheme())\nassert button[\"theme\"] == menu[\"theme\"] == \"dark\"\nprint(\"Matching dark theme\")\n",
    "javascript": "const lightTheme = {\n  button: () => ({kind: \"button\", theme: \"light\"}),\n  menu: () => ({kind: \"menu\", theme: \"light\"})\n};\nconst darkTheme = {\n  button: () => ({kind: \"button\", theme: \"dark\"}),\n  menu: () => ({kind: \"menu\", theme: \"dark\"})\n};\nconst buildScreen = factory => [factory.button(), factory.menu()];\nconst [button, menu] = buildScreen(darkTheme);\nif (button.theme !== menu.theme) throw new Error(\"Mixed family\");\nconsole.log(\"Matching dark theme\");\n",
    "output": "Matching dark theme",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "Several related products must be created as one compatible family, such as a complete theme.",
    "avoid": "Only one product varies or the products do not need family compatibility; a simple factory is enough."
  },
  "p2": {
    "summary": "The builder collects optional sections, then validates before producing an independent report.",
    "python": "class ReportBuilder:\n    def __init__(self): self.sections = []\n    def add(self, title):\n        self.sections.append(title)\n        return self\n    def build(self):\n        if not self.sections: raise ValueError(\"Add a section\")\n        return tuple(self.sections)\n\nreport = ReportBuilder().add(\"Summary\").add(\"Results\").build()\nassert report == (\"Summary\", \"Results\")\nprint(\"Summary, Results\")\n",
    "javascript": "class ReportBuilder {\n  sections = [];\n  add(title) { this.sections.push(title); return this; }\n  build() {\n    if (!this.sections.length) throw new Error(\"Add a section\");\n    return Object.freeze([...this.sections]);\n  }\n}\nconst report = new ReportBuilder().add(\"Summary\").add(\"Results\").build();\nif (report.join(\", \") !== \"Summary, Results\") throw new Error(\"Bad report\");\nconsole.log(report.join(\", \"));\n",
    "output": "Summary, Results",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "A complex result has optional steps, meaningful sequencing or validation before completion.",
    "avoid": "A constructor or configuration object remains clear; do not hide three simple arguments behind many steps."
  },
  "p3": {
    "summary": "Deep-copy nested configuration so editing a clone does not change the original.",
    "python": "from copy import deepcopy\noriginal = {\"name\": \"Motor\", \"settings\": {\"rating\": 20}}\nclone = deepcopy(original)\nclone[\"settings\"][\"rating\"] = 32\nassert original[\"settings\"][\"rating\"] == 20\nassert clone[\"settings\"][\"rating\"] == 32\nprint(\"Original 20; clone 32\")\n",
    "javascript": "const original = {name: \"Motor\", settings: {rating: 20}};\nconst clone = structuredClone(original);\nclone.settings.rating = 32;\nif (original.settings.rating !== 20) throw new Error(\"Shared state\");\nconsole.log(`Original ${original.settings.rating}; clone ${clone.settings.rating}`);\n",
    "output": "Original 20; clone 32",
    "limit": "structuredClone supports many data types but cannot clone every object, such as functions. Define explicit cloning for domain objects with special resources.",
    "verification": "runnable",
    "use": "Configured instances are expensive to construct and a well-defined independent copy is useful.",
    "avoid": "The object owns sockets, locks, identity or resources that cannot safely be duplicated; use explicit construction."
  },
  "p4": {
    "summary": "Repeated construction returns the same instance in this process.",
    "python": "class Settings:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance\n\na, b = Settings(), Settings()\nassert a is b\nprint(\"Same instance\")\n",
    "javascript": "class Settings {\n  static instance;\n  constructor() {\n    if (Settings.instance) return Settings.instance;\n    Settings.instance = this;\n  }\n}\nconst a = new Settings(), b = new Settings();\nif (a !== b) throw new Error(\"Different instances\");\nconsole.log(\"Same instance\");\n",
    "output": "Same instance",
    "limit": "A deliberately minimal singleton: not a concurrency-safe distributed lock. Python initialisation needs additional care under concurrency. Prefer explicit dependency injection for most application services.",
    "verification": "runnable",
    "use": "A genuinely process-wide resource has a justified single-instance lifetime and controlled access.",
    "avoid": "You only want easy global access. Prefer injected dependencies; a singleton does not coordinate multiple servers."
  },
  "p5": {
    "summary": "The adapter translates the app’s interface into the vendor’s different interface.",
    "python": "class Vendor:\n    def send_cents(self, cents): return f\"Sent {cents} cents\"\n\nclass PaymentAdapter:\n    def __init__(self, vendor): self.vendor = vendor\n    def pay_cents(self, amount_cents):\n        return self.vendor.send_cents(amount_cents)\n\nresult = PaymentAdapter(Vendor()).pay_cents(250)\nassert result == \"Sent 250 cents\"\nprint(result)\n",
    "javascript": "const vendor = {sendCents: cents => `Sent ${cents} cents`};\nclass PaymentAdapter {\n  constructor(vendor) { this.vendor = vendor; }\n  payCents(amountCents) { return this.vendor.sendCents(amountCents); }\n}\nconst result = new PaymentAdapter(vendor).payCents(250);\nif (result !== \"Sent 250 cents\") throw new Error(\"Wrong translation\");\nconsole.log(result);\n",
    "output": "Sent 250 cents",
    "limit": "The vendor is a local stub: no payment is sent. Real adapters must preserve currency, idempotency, authentication and error guarantees.",
    "verification": "runnable",
    "use": "A legacy or third-party interface differs from the contract your application should expose.",
    "avoid": "You control both interfaces and can simply align them; avoid wrappers that conceal important semantic differences."
  },
  "p6": {
    "summary": "Report content and rendering format vary independently through composition.",
    "python": "class HtmlRenderer:\n    def render(self, text): return f\"<p>{text}</p>\"\n\nclass Report:\n    def __init__(self, renderer): self.renderer = renderer\n    def content(self): return \"Summary\"\n    def show(self): return self.renderer.render(self.content())\n\nclass AuditReport(Report):\n    def content(self): return \"Audit\"\n\nassert AuditReport(HtmlRenderer()).show() == \"<p>Audit</p>\"\nprint(\"<p>Audit</p>\")\n",
    "javascript": "class HtmlRenderer { render(text) { return `<p>${text}</p>`; } }\nclass Report {\n  constructor(renderer) { this.renderer = renderer; }\n  content() { return \"Summary\"; }\n  show() { return this.renderer.render(this.content()); }\n}\nclass AuditReport extends Report { content() { return \"Audit\"; } }\nconst result = new AuditReport(new HtmlRenderer()).show();\nif (result !== \"<p>Audit</p>\") throw new Error(\"Bad rendering\");\nconsole.log(result);\n",
    "output": "<p>Audit</p>",
    "limit": "The content here is a constant. Escape or sanitise untrusted content before rendering HTML.",
    "verification": "runnable",
    "use": "Two independent dimensions of variation would otherwise create a multiplying inheritance hierarchy.",
    "avoid": "There is just one stable dimension; a strategy or a direct collaborator is usually simpler."
  },
  "p7": {
    "summary": "Both a single file and a folder provide size(), so groups can contain other groups.",
    "python": "class File:\n    def __init__(self, size): self._size = size\n    def size(self): return self._size\n\nclass Folder:\n    def __init__(self, *children): self.children = children\n    def size(self): return sum(child.size() for child in self.children)\n\ntree = Folder(File(10), Folder(File(20)))\nassert tree.size() == 30\nprint(\"30 bytes\")\n",
    "javascript": "class File {\n  constructor(size) { this.bytes = size; }\n  size() { return this.bytes; }\n}\nclass Folder {\n  constructor(...children) { this.children = children; }\n  size() { return this.children.reduce((n, child) => n + child.size(), 0); }\n}\nconst tree = new Folder(new File(10), new Folder(new File(20)));\nif (tree.size() !== 30) throw new Error(\"Wrong total\");\nconsole.log(`${tree.size()} bytes`);\n",
    "output": "30 bytes",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "The domain is a tree and callers should perform a common operation on leaves and nested groups.",
    "avoid": "The structure is not a tree or leaf/group behaviour is fundamentally different; use an explicit model instead."
  },
  "p8": {
    "summary": "A wrapper adds behaviour while keeping the same callable interface.",
    "python": "def writer(text): return text\n\ndef uppercase(inner):\n    def wrapped(text): return inner(text.upper())\n    return wrapped\n\nwrite = uppercase(writer)\nassert write(\"hello\") == \"HELLO\"\nprint(write(\"hello\"))\n",
    "javascript": "const writer = text => text;\nconst uppercase = inner => text => inner(text.toUpperCase());\nconst write = uppercase(writer);\nif (write(\"hello\") !== \"HELLO\") throw new Error(\"Wrapper missing\");\nconsole.log(write(\"hello\"));\n",
    "output": "HELLO",
    "limit": "A callable wrapper demonstrates the structural idea. It is not Python’s @decorator syntax requirement, and wrapper order can affect results.",
    "verification": "runnable",
    "use": "Optional behaviours can be composed around a stable interface, such as tracing and compression.",
    "avoid": "Ordering is hard to reason about or one fixed implementation suffices; keep behaviour direct and visible."
  },
  "p9": {
    "summary": "A small facade coordinates a subsystem behind one entry point.",
    "python": "def reserve_stock(item): return f\"Reserved {item}\"\ndef make_order(item): return f\"Order for {item}\"\n\ndef checkout(item):\n    reserve_stock(item)\n    return make_order(item)\n\nassert checkout(\"book\") == \"Order for book\"\nprint(checkout(\"book\"))\n",
    "javascript": "const reserveStock = item => `Reserved ${item}`;\nconst makeOrder = item => `Order for ${item}`;\nfunction checkout(item) {\n  reserveStock(item);\n  return makeOrder(item);\n}\nif (checkout(\"book\") !== \"Order for book\") throw new Error(\"Bad facade\");\nconsole.log(checkout(\"book\"));\n",
    "output": "Order for book",
    "limit": "A coordination sketch only. A real checkout needs failure, reservation expiry, consistency and compensation rules.",
    "verification": "runnable",
    "use": "Callers need a coherent, simple entry point to a complex subsystem.",
    "avoid": "You are merely moving every responsibility into one giant class; preserve focused domain modules."
  },
  "p10": {
    "summary": "Markers share one immutable icon while keeping separate positions.",
    "python": "from types import MappingProxyType\nicon = MappingProxyType({\"shape\": \"pin\", \"colour\": \"green\"})\na = {\"icon\": icon, \"position\": (1, 2)}\nb = {\"icon\": icon, \"position\": (9, 8)}\nassert a[\"icon\"] is b[\"icon\"]\nassert a[\"position\"] != b[\"position\"]\nprint(\"One shared icon; two positions\")\n",
    "javascript": "const icon = Object.freeze({shape: \"pin\", colour: \"green\"});\nconst a = {icon, position: [1, 2]};\nconst b = {icon, position: [9, 8]};\nif (a.icon !== b.icon) throw new Error(\"Icon not shared\");\nif (a.position === b.position) throw new Error(\"Positions shared\");\nconsole.log(\"One shared icon; two positions\");\n",
    "output": "One shared icon; two positions",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "Measurement shows many objects repeat substantial immutable data.",
    "avoid": "Memory savings are unmeasured or shared data must vary per object; ordinary objects are clearer."
  },
  "p11": {
    "summary": "A proxy delays creating the expensive object until the first use.",
    "python": "class Image:\n    def show(self): return \"Image shown\"\n\nclass LazyImage:\n    def __init__(self): self.image = None\n    def show(self):\n        if self.image is None: self.image = Image()\n        return self.image.show()\n\nproxy = LazyImage()\nassert proxy.image is None\nassert proxy.show() == \"Image shown\"\nprint(proxy.show())\n",
    "javascript": "class Image { show() { return \"Image shown\"; } }\nclass LazyImage {\n  image = null;\n  show() {\n    this.image ??= new Image();\n    return this.image.show();\n  }\n}\nconst proxy = new LazyImage();\nif (proxy.image !== null) throw new Error(\"Loaded too early\");\nif (proxy.show() !== \"Image shown\") throw new Error(\"Bad proxy\");\nconsole.log(proxy.show());\n",
    "output": "Image shown",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "Access control, lazy creation or a remote/cache boundary needs a stand-in with the same interface.",
    "avoid": "Indirection hides important latency, freshness or permission behaviour, or a direct call is already clear."
  },
  "p12": {
    "summary": "A request passes through handlers until one accepts it; otherwise it reaches an explicit fallback.",
    "python": "def faq(topic): return \"FAQ answer\" if topic == \"hours\" else None\ndef agent(topic): return \"Agent assigned\" if topic == \"refund\" else None\n\ndef route(topic):\n    for handler in (faq, agent):\n        answer = handler(topic)\n        if answer is not None: return answer\n    return \"Escalate to specialist\"\n\nassert route(\"refund\") == \"Agent assigned\"\nassert route(\"unknown\") == \"Escalate to specialist\"\nprint(route(\"refund\"))\n",
    "javascript": "const faq = topic => topic === \"hours\" ? \"FAQ answer\" : null;\nconst agent = topic => topic === \"refund\" ? \"Agent assigned\" : null;\nfunction route(topic) {\n  for (const handler of [faq, agent]) {\n    const answer = handler(topic);\n    if (answer !== null) return answer;\n  }\n  return \"Escalate to specialist\";\n}\nif (route(\"unknown\") !== \"Escalate to specialist\") throw new Error(\"No fallback\");\nconsole.log(route(\"refund\"));\n",
    "output": "Agent assigned",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "Several ordered potential handlers may accept a request and a fallback can be defined.",
    "avoid": "Exactly one fixed handler exists, or every mandatory step must run; use a direct call or explicit pipeline."
  },
  "p13": {
    "summary": "An action remembers enough information to undo its own change.",
    "python": "class Move:\n    def __init__(self, point, delta):\n        self.point, self.delta = point, delta\n    def execute(self): self.point[\"x\"] += self.delta\n    def undo(self): self.point[\"x\"] -= self.delta\n\npoint = {\"x\": 5}\ncommand = Move(point, 3)\ncommand.execute()\nassert point[\"x\"] == 8\ncommand.undo()\nassert point[\"x\"] == 5\nprint(\"Back to x=5\")\n",
    "javascript": "class Move {\n  constructor(point, delta) { this.point = point; this.delta = delta; }\n  execute() { this.point.x += this.delta; }\n  undo() { this.point.x -= this.delta; }\n}\nconst point = {x: 5}, command = new Move(point, 3);\ncommand.execute();\nif (point.x !== 8) throw new Error(\"Move failed\");\ncommand.undo();\nif (point.x !== 5) throw new Error(\"Undo failed\");\nconsole.log(\"Back to x=5\");\n",
    "output": "Back to x=5",
    "limit": "Assumes this command is executed once and undone in order. Real command histories must handle repeated execution, later edits and failures.",
    "verification": "runnable",
    "use": "Actions need queueing, histories, deferred execution or a defined undo operation.",
    "avoid": "You only need one immediate function call; avoid command classes with no useful lifecycle."
  },
  "p14": {
    "summary": "A tiny expression tree interprets a bounded rule language without executing arbitrary source code.",
    "python": "def interpret(expr, values):\n    op, *args = expr\n    if op == \"gt\": return values[args[0]] > args[1]\n    if op == \"and\": return all(interpret(e, values) for e in args)\n    raise ValueError(\"Unknown operator\")\n\nrule = (\"and\", (\"gt\", \"age\", 18), (\"gt\", \"score\", 70))\nassert interpret(rule, {\"age\": 25, \"score\": 80})\nprint(\"Eligible\")\n",
    "javascript": "function interpret([op, ...args], values) {\n  if (op === \"gt\") return values[args[0]] > args[1];\n  if (op === \"and\") return args.every(e => interpret(e, values));\n  throw new Error(\"Unknown operator\");\n}\nconst rule = [\"and\", [\"gt\", \"age\", 18], [\"gt\", \"score\", 70]];\nif (!interpret(rule, {age: 25, score: 80})) throw new Error(\"Rule failed\");\nconsole.log(\"Eligible\");\n",
    "output": "Eligible",
    "limit": "The tree is prebuilt. A real rule input needs schema validation, allowed fields, type checks and limits on size/depth. Never replace this with eval.",
    "verification": "runnable",
    "use": "A small stable rule grammar needs controlled evaluation.",
    "avoid": "The language is complex or security-sensitive input would tempt eval; use a maintained parser and bounded execution."
  },
  "p15": {
    "summary": "A generator traverses a collection while hiding its underlying organisation.",
    "python": "def all_items(pages):\n    for page in pages:\n        yield from page\n\nitems = list(all_items([[1, 2], [], [3]]))\nassert items == [1, 2, 3]\nprint(\", \".join(map(str, items)))\n",
    "javascript": "function* allItems(pages) {\n  for (const page of pages) yield* page;\n}\nconst items = [...allItems([[1, 2], [], [3]])];\nif (items.join(\", \") !== \"1, 2, 3\") throw new Error(\"Traversal failed\");\nconsole.log(items.join(\", \"));\n",
    "output": "1, 2, 3",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "Callers need uniform or lazy traversal without knowing storage organisation.",
    "avoid": "A built-in iterator already does the job; avoid hand-written traversal abstractions without a new requirement."
  },
  "p16": {
    "summary": "Controls notify a mediator, which coordinates another control without direct control-to-control coupling.",
    "python": "class FormMediator:\n    def __init__(self): self.submit_enabled = False\n    def changed(self, sender, value):\n        if sender == \"name\": self.submit_enabled = bool(value.strip())\n\nclass NameField:\n    def __init__(self, mediator): self.mediator = mediator\n    def edit(self, value): self.mediator.changed(\"name\", value)\n\nform = FormMediator()\nNameField(form).edit(\"Nuwan\")\nassert form.submit_enabled\nprint(\"Submit enabled\")\n",
    "javascript": "class FormMediator {\n  submitEnabled = false;\n  changed(sender, value) {\n    if (sender === \"name\") this.submitEnabled = value.trim().length > 0;\n  }\n}\nclass NameField {\n  constructor(mediator) { this.mediator = mediator; }\n  edit(value) { this.mediator.changed(\"name\", value); }\n}\nconst form = new FormMediator();\nnew NameField(form).edit(\"Nuwan\");\nif (!form.submitEnabled) throw new Error(\"Not coordinated\");\nconsole.log(\"Submit enabled\");\n",
    "output": "Submit enabled",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "Several collaborators interact in ways that are hard to manage with direct cross-references.",
    "avoid": "A few direct interactions are clear, or the mediator starts owning unrelated domain rules."
  },
  "p17": {
    "summary": "Only the document creates and restores its own snapshot; the caller treats the snapshot as opaque.",
    "python": "class Document:\n    def __init__(self, text): self._text = text\n    def edit(self, text): self._text = text\n    def snapshot(self): return self._text\n    def restore(self, snapshot): self._text = snapshot\n    def read(self): return self._text\n\ndoc = Document(\"Draft\")\nsaved = doc.snapshot()\ndoc.edit(\"Changed\")\ndoc.restore(saved)\nassert doc.read() == \"Draft\"\nprint(doc.read())\n",
    "javascript": "class Document {\n  #text;\n  constructor(text) { this.#text = text; }\n  edit(text) { this.#text = text; }\n  snapshot() { return this.#text; }\n  restore(snapshot) { this.#text = snapshot; }\n  read() { return this.#text; }\n}\nconst doc = new Document(\"Draft\"), saved = doc.snapshot();\ndoc.edit(\"Changed\"); doc.restore(saved);\nif (doc.read() !== \"Draft\") throw new Error(\"Restore failed\");\nconsole.log(doc.read());\n",
    "output": "Draft",
    "limit": "A string is immutable. Nested mutable document state needs an independent snapshot and a defined version/restore contract.",
    "verification": "runnable",
    "use": "Undo, checkpointing or restoring a bounded state snapshot is required.",
    "avoid": "Snapshots are too large, contain data you must not retain or cannot restore resources reliably; consider explicit changes/events."
  },
  "p18": {
    "summary": "Listeners subscribe to a local model change, then explicitly unsubscribe.",
    "python": "class Model:\n    def __init__(self): self.listeners = set()\n    def subscribe(self, fn):\n        self.listeners.add(fn)\n        return lambda: self.listeners.discard(fn)\n    def change(self, value):\n        for fn in tuple(self.listeners): fn(value)\n\nmodel, seen = Model(), []\nstop = model.subscribe(seen.append)\nmodel.change(7); stop(); model.change(9)\nassert seen == [7]\nprint(\"Received 7 only\")\n",
    "javascript": "class Model {\n  listeners = new Set();\n  subscribe(fn) {\n    this.listeners.add(fn);\n    return () => this.listeners.delete(fn);\n  }\n  change(value) { for (const fn of [...this.listeners]) fn(value); }\n}\nconst model = new Model(), seen = [];\nconst stop = model.subscribe(value => seen.push(value));\nmodel.change(7); stop(); model.change(9);\nif (seen.join() !== \"7\") throw new Error(\"Unsubscribe failed\");\nconsole.log(\"Received 7 only\");\n",
    "output": "Received 7 only",
    "limit": "Local synchronous observers only. Choose listener error handling and ordering explicitly; distributed messages add delivery and consistency concerns.",
    "verification": "runnable",
    "use": "Several local listeners must react to a model change without hard-wiring the producer to each one.",
    "avoid": "A single direct call is clearer, or you need durable distributed delivery; use explicit calls or a suitable message system."
  },
  "p19": {
    "summary": "The current state object decides whether an action is legal and moves the order to its next state.",
    "python": "class Pending:\n    def pay(self, order): order.state = Paid()\nclass Paid:\n    def pay(self, order): raise ValueError(\"Already paid\")\nclass Order:\n    def __init__(self): self.state = Pending()\n    def pay(self): self.state.pay(self)\n\norder = Order(); order.pay()\nassert isinstance(order.state, Paid)\ntry: order.pay()\nexcept ValueError: print(\"Duplicate payment rejected\")\nelse: raise AssertionError(\"Duplicate accepted\")\n",
    "javascript": "class Pending { pay(order) { order.state = new Paid(); } }\nclass Paid { pay() { throw new Error(\"Already paid\"); } }\nclass Order {\n  state = new Pending();\n  pay() { this.state.pay(this); }\n}\nconst order = new Order(); order.pay();\nlet rejected = false;\ntry { order.pay(); } catch { rejected = true; }\nif (!rejected) throw new Error(\"Duplicate accepted\");\nconsole.log(\"Duplicate payment rejected\");\n",
    "output": "Duplicate payment rejected",
    "limit": "In-memory state illustrates the pattern; it does not prevent duplicate payments across processes or crashes. Production requires durable state and atomic transitions.",
    "verification": "runnable",
    "use": "Allowed actions and behaviour depend on a lifecycle with meaningful states and transitions.",
    "avoid": "There are only a couple of simple fixed cases; an explicit enum plus a transition table may be enough."
  },
  "p20": {
    "summary": "The caller selects a pricing algorithm through the same callable interface.",
    "python": "def flat_shipping(weight_kg): return 500\ndef weight_shipping(weight_kg): return weight_kg * 200\n\ndef shipping_cost(weight_kg, strategy):\n    return strategy(weight_kg)\n\nassert shipping_cost(3, flat_shipping) == 500\nassert shipping_cost(3, weight_shipping) == 600\nprint(\"Weight-based: 600 cents\")\n",
    "javascript": "const flatShipping = weightKg => 500;\nconst weightShipping = weightKg => weightKg * 200;\nconst shippingCost = (weightKg, strategy) => strategy(weightKg);\nif (shippingCost(3, flatShipping) !== 500) throw new Error(\"Flat rate\");\nif (shippingCost(3, weightShipping) !== 600) throw new Error(\"Weight rate\");\nconsole.log(\"Weight-based: 600 cents\");\n",
    "output": "Weight-based: 600 cents",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "Several interchangeable algorithms vary independently from the caller.",
    "avoid": "There is one fixed algorithm or a tiny stable conditional; do not manufacture a strategy hierarchy."
  },
  "p21": {
    "summary": "The base class fixes the workflow order; a subclass supplies the variable parsing step.",
    "python": "class Importer:\n    def run(self, text):\n        items = self.parse(text)\n        if not items: raise ValueError(\"Empty import\")\n        return tuple(items)\n    def parse(self, text): raise NotImplementedError\n\nclass CsvImporter(Importer):\n    def parse(self, text): return text.split(\",\") if text else []\n\nassert CsvImporter().run(\"a,b\") == (\"a\", \"b\")\nprint(\"Imported a, b\")\n",
    "javascript": "class Importer {\n  run(text) {\n    const items = this.parse(text);\n    if (!items.length) throw new Error(\"Empty import\");\n    return Object.freeze([...items]);\n  }\n  parse() { throw new Error(\"Implement parse\"); }\n}\nclass CsvImporter extends Importer {\n  parse(text) { return text ? text.split(\",\") : []; }\n}\nif (new CsvImporter().run(\"a,b\").join() !== \"a,b\") throw new Error(\"Bad import\");\nconsole.log(\"Imported a, b\");\n",
    "output": "Imported a, b",
    "limit": "The split operation is a toy parser, not a complete CSV parser. Use a maintained parser for quoted fields, escapes and real files.",
    "verification": "runnable",
    "use": "A stable algorithm skeleton needs a few specialised steps and inheritance is a suitable relationship.",
    "avoid": "Variants need independent composition or routinely replace the whole workflow; prefer strategies/collaborators."
  },
  "p22": {
    "summary": "Elements accept a visitor. Adding a new operation means adding a visitor rather than editing each element type.",
    "python": "class Text:\n    def __init__(self, value): self.value = value\n    def accept(self, visitor): return visitor.text(self)\nclass Image:\n    def accept(self, visitor): return visitor.image(self)\nclass WordCount:\n    def text(self, item): return len(item.value.split())\n    def image(self, item): return 0\n\nitems = [Text(\"hello world\"), Image()]\nassert sum(item.accept(WordCount()) for item in items) == 2\nprint(\"2 words\")\n",
    "javascript": "class Text {\n  constructor(value) { this.value = value; }\n  accept(visitor) { return visitor.text(this); }\n}\nclass Image { accept(visitor) { return visitor.image(this); } }\nclass WordCount {\n  text(item) { return item.value.trim().split(/\\s+/).filter(Boolean).length; }\n  image() { return 0; }\n}\nconst items = [new Text(\"hello world\"), new Image()];\nconst total = items.reduce((n, item) => n + item.accept(new WordCount()), 0);\nif (total !== 2) throw new Error(\"Wrong count\");\nconsole.log(`${total} words`);\n",
    "output": "2 words",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "Element types are stable while you frequently add operations across the whole structure.",
    "avoid": "Element types change frequently, since each new type forces visitor changes; use direct polymorphism or another traversal design."
  },
  "d0": {
    "summary": "Pricing calculates; formatting presents. Changing the output format does not alter the pricing rule.",
    "python": "def invoice_total_cents(lines): return sum(lines)\ndef format_invoice(total_cents): return f\"Total: {total_cents} cents\"\n\ntotal = invoice_total_cents([100, 250])\nassert total == 350\nprint(format_invoice(total))\n",
    "javascript": "const invoiceTotalCents = lines => lines.reduce((a, b) => a + b, 0);\nconst formatInvoice = cents => `Total: ${cents} cents`;\nconst total = invoiceTotalCents([100, 250]);\nif (total !== 350) throw new Error(\"Wrong pricing\");\nconsole.log(formatInvoice(total));\n",
    "output": "Total: 350 cents",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "A module contains responsibilities that change for different business reasons.",
    "avoid": "Splitting one coherent responsibility into tiny classes that must always change together."
  },
  "d1": {
    "summary": "Add an algorithm through the existing strategy contract, leaving the stable calculation function untouched.",
    "python": "def shipping(weight, strategy): return strategy(weight)\nflat = lambda weight: 500\nexpress = lambda weight: 900 + 100 * weight\n\nassert shipping(2, flat) == 500\nassert shipping(2, express) == 1100\nprint(\"Express: 1100 cents\")\n",
    "javascript": "const shipping = (weight, strategy) => strategy(weight);\nconst flat = weight => 500;\nconst express = weight => 900 + 100 * weight;\nif (shipping(2, flat) !== 500) throw new Error(\"Flat changed\");\nif (shipping(2, express) !== 1100) throw new Error(\"Express failed\");\nconsole.log(\"Express: 1100 cents\");\n",
    "output": "Express: 1100 cents",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "You already know a recurring variation that should extend stable behaviour through a contract.",
    "avoid": "Building extension points for hypothetical futures, or refusing to fix defective existing code."
  },
  "d2": {
    "summary": "Both stores honour the same read contract: return the requested text or raise an error for a missing key.",
    "python": "class MemoryStore:\n    def __init__(self, items): self.items = items\n    def read(self, key): return self.items[key]\nclass ReadOnlyStore(MemoryStore):\n    pass  # Still honours the read contract.\n\ndef load_title(reader): return reader.read(\"title\")\nfor store in [MemoryStore({\"title\": \"Guide\"}), ReadOnlyStore({\"title\": \"Guide\"})]:\n    assert load_title(store) == \"Guide\"\nprint(\"Both readers return Guide\")\n",
    "javascript": "class MemoryStore {\n  constructor(items) { this.items = new Map(Object.entries(items)); }\n  read(key) {\n    if (!this.items.has(key)) throw new Error(\"Missing key\");\n    return this.items.get(key);\n  }\n}\nclass ReadOnlyStore extends MemoryStore {}\nconst loadTitle = reader => reader.read(\"title\");\nfor (const reader of [new MemoryStore({title: \"Guide\"}), new ReadOnlyStore({title: \"Guide\"})]) {\n  if (loadTitle(reader) !== \"Guide\") throw new Error(\"Contract broken\");\n}\nconsole.log(\"Both readers return Guide\");\n",
    "output": "Both readers return Guide",
    "limit": "Substitution is about all documented promises, not merely this one successful call. Test failure behaviour and other contract conditions too.",
    "verification": "runnable",
    "use": "An implementation, subclass or test double must replace another without surprising callers.",
    "avoid": "Assuming equal method names guarantee equal behaviour; never use inheritance that weakens the agreed contract."
  },
  "d3": {
    "summary": "The viewer receives only the reading capability; it does not depend on an administrator’s wider interface.",
    "python": "class ReportReader:\n    def read(self, key): return \"Report \" + key\n\ndef preview(reader): return reader.read(\"A\")\n\nassert preview(ReportReader()) == \"Report A\"\nprint(preview(ReportReader()))\n",
    "javascript": "const reportReader = {read: key => `Report ${key}`};\nconst preview = reader => reader.read(\"A\");\nif (preview(reportReader) !== \"Report A\") throw new Error(\"Bad reader\");\nconsole.log(preview(reportReader));\n",
    "output": "Report A",
    "limit": "An interface boundary is not an authorisation control. Server-side access checks are still required.",
    "verification": "runnable",
    "use": "Callers are forced to depend on capabilities they do not use.",
    "avoid": "Fragmenting every method into its own interface when callers share one coherent responsibility."
  },
  "d4": {
    "summary": "The business workflow accepts a payment capability instead of constructing a vendor-specific client.",
    "python": "class FakePayment:\n    def charge_cents(self, cents): return f\"Accepted {cents}\"\n\ndef place_order(payment, cents):\n    return payment.charge_cents(cents)\n\nassert place_order(FakePayment(), 500) == \"Accepted 500\"\nprint(place_order(FakePayment(), 500))\n",
    "javascript": "const fakePayment = {chargeCents: cents => `Accepted ${cents}`};\nfunction placeOrder(payment, cents) {\n  return payment.chargeCents(cents);\n}\nif (placeOrder(fakePayment, 500) !== \"Accepted 500\") throw new Error(\"Bad port\");\nconsole.log(placeOrder(fakePayment, 500));\n",
    "output": "Accepted 500",
    "limit": "The fake demonstrates dependency direction and testability. It does not establish the real provider’s behaviour.",
    "verification": "runnable",
    "use": "Business policy must be insulated from databases, vendors or other volatile details.",
    "avoid": "Adding abstract layers that duplicate a mature framework without providing a useful boundary."
  },
  "d5": {
    "summary": "One function owns the discount rule, and every caller uses that function.",
    "python": "def discounted_cents(price_cents):\n    return price_cents * 90 // 100  # One rounding policy.\n\ncart_total = discounted_cents(1000)\nreceipt_total = discounted_cents(1000)\nassert cart_total == receipt_total == 900\nprint(\"Both totals: 900 cents\")\n",
    "javascript": "const discountedCents = priceCents => Math.floor(priceCents * 90 / 100);\nconst cartTotal = discountedCents(1000);\nconst receiptTotal = discountedCents(1000);\nif (cartTotal !== 900 || receiptTotal !== 900) throw new Error(\"Rule drift\");\nconsole.log(\"Both totals: 900 cents\");\n",
    "output": "Both totals: 900 cents",
    "limit": "Toy non-negative integer-cent prices. Specify ranges, currencies and a justified rounding policy; JavaScript numbers have safe-integer limits.",
    "verification": "runnable",
    "use": "Multiple places encode the same business knowledge and would need the same correction.",
    "avoid": "Merging similar-looking code that represents different rules; some duplication is cheaper than the wrong shared abstraction."
  },
  "d6": {
    "summary": "A direct calculation is clearer than an unnecessary hierarchy of calculators.",
    "python": "def total_cents(prices): return sum(prices)\nassert total_cents([100, 200, 50]) == 350\nprint(\"350 cents\")\n",
    "javascript": "const totalCents = prices => prices.reduce((sum, price) => sum + price, 0);\nif (totalCents([100, 200, 50]) !== 350) throw new Error(\"Wrong total\");\nconsole.log(\"350 cents\");\n",
    "output": "350 cents",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "Choosing among designs that all meet the actual functional and quality requirements.",
    "avoid": "Calling omission of validation, security or recovery simplicity; the simplest adequate design still meets those requirements."
  },
  "d7": {
    "summary": "Implement the requested flat delivery rule without a speculative plugin system.",
    "python": "def delivery_cents(subtotal_cents):\n    return 0 if subtotal_cents >= 5000 else 500\n\nassert delivery_cents(4999) == 500\nassert delivery_cents(5000) == 0\nprint(\"Free delivery from 5000 cents\")\n",
    "javascript": "function deliveryCents(subtotalCents) {\n  return subtotalCents >= 5000 ? 0 : 500;\n}\nif (deliveryCents(4999) !== 500 || deliveryCents(5000) !== 0) {\n  throw new Error(\"Threshold wrong\");\n}\nconsole.log(\"Free delivery from 5000 cents\");\n",
    "output": "Free delivery from 5000 cents",
    "limit": "The decision not to add speculative features is the principle. Required validation, security and recovery controls are still necessary.",
    "verification": "runnable",
    "use": "A feature is speculative and can be added later without unacceptable cost or risk.",
    "avoid": "Using YAGNI to omit known security, safety, legal or recovery needs that already apply."
  },
  "d8": {
    "summary": "The transport handler delegates to a business calculation instead of duplicating the rule.",
    "python": "def quote_cents(quantity): return quantity * 200\n\ndef handle_quote(request):\n    return {\"total_cents\": quote_cents(request[\"quantity\"])}\n\nassert handle_quote({\"quantity\": 3}) == {\"total_cents\": 600}\nprint(\"Quoted 600 cents\")\n",
    "javascript": "const quoteCents = quantity => quantity * 200;\nconst handleQuote = request => ({totalCents: quoteCents(request.quantity)});\nif (handleQuote({quantity: 3}).totalCents !== 600) throw new Error(\"Wrong quote\");\nconsole.log(\"Quoted 600 cents\");\n",
    "output": "Quoted 600 cents",
    "limit": "The handler is a local stand-in for HTTP. A real request boundary must authenticate, validate and authorise inputs.",
    "verification": "runnable",
    "use": "Presentation, domain rules, transport and persistence are becoming entangled.",
    "avoid": "Separating by folder name alone, or adding layers that constantly pass data through without purpose."
  },
  "d9": {
    "summary": "Inventory owns stock and exposes one focused operation to its caller.",
    "python": "class Inventory:\n    def __init__(self): self._stock = {\"book\": 2}\n    def reserve(self, item):\n        if self._stock.get(item, 0) < 1: raise ValueError(\"Out of stock\")\n        self._stock[item] -= 1\n        return \"Reserved\"\n\ndef checkout(inventory): return inventory.reserve(\"book\")\nassert checkout(Inventory()) == \"Reserved\"\nprint(\"Reserved\")\n",
    "javascript": "class Inventory {\n  #stock = new Map([[\"book\", 2]]);\n  reserve(item) {\n    if ((this.#stock.get(item) ?? 0) < 1) throw new Error(\"Out of stock\");\n    this.#stock.set(item, this.#stock.get(item) - 1);\n    return \"Reserved\";\n  }\n}\nconst checkout = inventory => inventory.reserve(\"book\");\nif (checkout(new Inventory()) !== \"Reserved\") throw new Error(\"Not reserved\");\nconsole.log(\"Reserved\");\n",
    "output": "Reserved",
    "limit": "Single-process stock only. Concurrent production reservations need atomic storage operations and an expiry/release policy.",
    "verification": "runnable",
    "use": "A change unexpectedly ripples into unrelated modules or related rules are scattered.",
    "avoid": "Chasing zero dependencies or grouping unrelated functions merely because they share a technical label."
  },
  "d10": {
    "summary": "A report uses a renderer collaborator rather than inheriting a renderer-specific report class.",
    "python": "class Report:\n    def __init__(self, render): self.render = render\n    def show(self, text): return self.render(text)\n\nplain = Report(lambda text: text)\nbracketed = Report(lambda text: f\"[{text}]\")\nassert plain.show(\"Guide\") == \"Guide\"\nassert bracketed.show(\"Guide\") == \"[Guide]\"\nprint(\"[Guide]\")\n",
    "javascript": "class Report {\n  constructor(render) { this.render = render; }\n  show(text) { return this.render(text); }\n}\nconst plain = new Report(text => text);\nconst bracketed = new Report(text => `[${text}]`);\nif (plain.show(\"Guide\") !== \"Guide\") throw new Error(\"Plain failed\");\nconsole.log(bracketed.show(\"Guide\"));\n",
    "output": "[Guide]",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "Behaviour varies along independent dimensions or must be assembled at runtime.",
    "avoid": "Banning inheritance even when a stable, well-understood substitution relationship fits."
  },
  "d11": {
    "summary": "Balance changes go through a checked operation instead of arbitrary field assignment.",
    "python": "class Account:\n    def __init__(self, cents): self.__cents = cents\n    @property\n    def balance(self): return self.__cents\n    def withdraw(self, cents):\n        if not 0 < cents <= self.__cents: raise ValueError(\"Invalid withdrawal\")\n        self.__cents -= cents\n\naccount = Account(1000); account.withdraw(250)\nassert account.balance == 750\nprint(\"Balance: 750 cents\")\n",
    "javascript": "class Account {\n  #cents;\n  constructor(cents) { this.#cents = cents; }\n  get balance() { return this.#cents; }\n  withdraw(cents) {\n    if (!(cents > 0 && cents <= this.#cents)) throw new Error(\"Invalid withdrawal\");\n    this.#cents -= cents;\n  }\n}\nconst account = new Account(1000); account.withdraw(250);\nif (account.balance !== 750) throw new Error(\"Wrong balance\");\nconsole.log(`Balance: ${account.balance} cents`);\n",
    "output": "Balance: 750 cents",
    "limit": "Encapsulation is a program-structure tool, not a security sandbox. Real accounts require input validation, durable transactions, concurrency controls and auditability.",
    "verification": "runnable",
    "use": "State has invariants that should only change through a coherent public operation.",
    "avoid": "Assuming private fields stop an attacker or treating unrestricted setters as invariant protection."
  },
  "d12": {
    "summary": "The server-side policy grants only the specific action included in a user’s permissions.",
    "python": "def allowed(permissions, action): return action in permissions\nexport_worker = {\"reports:read\"}\nassert allowed(export_worker, \"reports:read\")\nassert not allowed(export_worker, \"users:delete\")\nprint(\"Read allowed; delete denied\")\n",
    "javascript": "const allowed = (permissions, action) => permissions.has(action);\nconst exportWorker = new Set([\"reports:read\"]);\nif (!allowed(exportWorker, \"reports:read\")) throw new Error(\"Read denied\");\nif (allowed(exportWorker, \"users:delete\")) throw new Error(\"Too much access\");\nconsole.log(\"Read allowed; delete denied\");\n",
    "output": "Read allowed; delete denied",
    "limit": "Use trusted server-established permissions. A caller must not be able to submit its own role or permission list.",
    "verification": "runnable",
    "use": "Any identity, worker, integration or CI job is granted access to resources.",
    "avoid": "Granting broad administrator access to avoid understanding a permission failure; least privilege remains the goal."
  },
  "d13": {
    "summary": "Two different controls check role and resource ownership; passing one does not bypass the other.",
    "python": "def can_edit(user, document):\n    role_ok = user[\"role\"] == \"editor\"\n    tenant_ok = user[\"tenant\"] == document[\"tenant\"]\n    return role_ok and tenant_ok\n\nuser = {\"role\": \"editor\", \"tenant\": \"A\"}\nassert not can_edit(user, {\"tenant\": \"B\"})\nprint(\"Cross-tenant access denied\")\n",
    "javascript": "function canEdit(user, document) {\n  const roleOk = user.role === \"editor\";\n  const tenantOk = user.tenant === document.tenant;\n  return roleOk && tenantOk;\n}\nconst user = {role: \"editor\", tenant: \"A\"};\nif (canEdit(user, {tenant: \"B\"})) throw new Error(\"Tenant leak\");\nconsole.log(\"Cross-tenant access denied\");\n",
    "output": "Cross-tenant access denied",
    "limit": "One small part of defence in depth, not a complete layered security architecture. Add trustworthy identity, storage isolation, monitoring and other appropriate controls.",
    "verification": "runnable",
    "use": "Failure of one protective control must not expose the whole system.",
    "avoid": "Counting repeated copies of one flawed check as independent protection, or using layers instead of fixing a known defect."
  },
  "d14": {
    "summary": "A failed permission lookup returns a denial instead of silently authorising the action.",
    "python": "def authorise(check):\n    try: return check() is True\n    except ConnectionError: return False\n\ndef unavailable(): raise ConnectionError(\"Policy service offline\")\nassert authorise(unavailable) is False\nprint(\"Denied on service failure\")\n",
    "javascript": "class PolicyUnavailable extends Error {}\nfunction authorise(check) {\n  try { return check() === true; }\n  catch (error) {\n    if (error instanceof PolicyUnavailable) return false;\n    throw error;\n  }\n}\nconst unavailable = () => { throw new PolicyUnavailable(\"Offline\"); };\nif (authorise(unavailable)) throw new Error(\"Failed open\");\nconsole.log(\"Denied on service failure\");\n",
    "output": "Denied on service failure",
    "limit": "Record the failure and define a recovery path. Denying access must not hide operational errors or replace system-level availability design.",
    "verification": "runnable",
    "use": "An uncertain or failed security decision could otherwise allow access or an unsafe operation.",
    "avoid": "Swallowing the error and abandoning recovery planning. Safety and availability failures need an explicit system-level response."
  },
  "d15": {
    "summary": "The boundary specifies a unit and rejects non-finite or out-of-range values.",
    "python": "import math\n\ndef area_mm2(width_mm, thickness_mm):\n    for value in (width_mm, thickness_mm):\n        if type(value) not in (int, float) or not math.isfinite(value) or value <= 0:\n            raise ValueError(\"Expected positive finite millimetres\")\n    return width_mm * thickness_mm\n\nassert area_mm2(50, 10) == 500\nprint(\"500 mm2\")\n",
    "javascript": "function areaMm2(widthMm, thicknessMm) {\n  for (const value of [widthMm, thicknessMm]) {\n    if (typeof value !== \"number\" || !Number.isFinite(value) || value <= 0) {\n      throw new Error(\"Expected positive finite millimetres\");\n    }\n  }\n  return widthMm * thicknessMm;\n}\nif (areaMm2(50, 10) !== 500) throw new Error(\"Wrong area\");\nconsole.log(\"500 mm2\");\n",
    "output": "500 mm2",
    "limit": "Naming units reduces mistakes but cannot detect a caller passing inches as millimetres. Define domain limits and numerical precision too.",
    "verification": "runnable",
    "use": "Data crosses a boundary or a calculation has units, validity limits and precision requirements.",
    "avoid": "Relying on names or static types alone to validate untrusted runtime input or establish numerical correctness."
  },
  "d16": {
    "summary": "The same operation key returns the recorded result without repeating the effect.",
    "python": "results, charges = {}, []\ndef charge(key, cents):\n    if key in results:\n        old_cents, result = results[key]\n        if old_cents != cents: raise ValueError(\"Key reused with different input\")\n        return result\n    charges.append(cents)\n    result = \"payment-1\"\n    results[key] = (cents, result)\n    return result\n\nassert charge(\"request-7\", 500) == charge(\"request-7\", 500)\nassert charges == [500]\nprint(\"One charge\")\n",
    "javascript": "const results = new Map(), charges = [];\nfunction charge(key, cents) {\n  if (results.has(key)) {\n    const old = results.get(key);\n    if (old.cents !== cents) throw new Error(\"Key reused with different input\");\n    return old.result;\n  }\n  charges.push(cents);\n  const result = \"payment-1\";\n  results.set(key, {cents, result});\n  return result;\n}\ncharge(\"request-7\", 500); charge(\"request-7\", 500);\nif (charges.length !== 1) throw new Error(\"Duplicate charge\");\nconsole.log(\"One charge\");\n",
    "output": "One charge",
    "limit": "In-memory sequential demonstration only; no payment is sent. Production needs durable atomic deduplication, concurrent-request control, key scope/retention and crash recovery.",
    "verification": "runnable",
    "use": "Requests, jobs or messages can be delivered or retried more than once.",
    "avoid": "Using an in-memory flag or disabled button as a durable guarantee. Some actions cannot be made safe without protocol changes."
  },
  "d17": {
    "summary": "Preconditions reject an invalid transfer; a postcondition checks that the total remains unchanged.",
    "python": "def transfer(a, b, cents):\n    if not 0 < cents <= a: raise ValueError(\"Invalid transfer\")\n    before = a + b\n    a, b = a - cents, b + cents\n    if a + b != before: raise RuntimeError(\"Invariant broken\")\n    return a, b\n\nassert transfer(1000, 200, 300) == (700, 500)\nprint(\"Total preserved: 1200 cents\")\n",
    "javascript": "function transfer(a, b, cents) {\n  if (!(cents > 0 && cents <= a)) throw new Error(\"Invalid transfer\");\n  const before = a + b;\n  const result = [a - cents, b + cents];\n  if (result[0] + result[1] !== before) throw new Error(\"Invariant broken\");\n  return result;\n}\nconst [a, b] = transfer(1000, 200, 300);\nif (a !== 700 || b !== 500) throw new Error(\"Wrong allocation\");\nconsole.log(`Total preserved: ${a + b} cents`);\n",
    "output": "Total preserved: 1200 cents",
    "limit": "Arithmetic over small integer values, not a financial ledger implementation. Real transfers need currency/range validation and atomic persistence.",
    "verification": "runnable",
    "use": "Operations have important preconditions, postconditions or invariants.",
    "avoid": "Treating assertions as a substitute for validated external input, fault handling or an independent correctness oracle."
  },
  "d18": {
    "summary": "A bounded cleanup replaces a vague name with a meaningful one while preserving behaviour.",
    "python": "# Before: def f(x): return x * 60\n# After: one local naming improvement, same behaviour.\ndef minutes_to_seconds(minutes): return minutes * 60\n\nassert minutes_to_seconds(2) == 120\nprint(\"120 seconds\")\n",
    "javascript": "// Before: const f = x => x * 60;\n// After: a bounded rename, without a broad rewrite.\nconst minutesToSeconds = minutes => minutes * 60;\nif (minutesToSeconds(2) !== 120) throw new Error(\"Behaviour changed\");\nconsole.log(\"120 seconds\");\n",
    "output": "120 seconds",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "You are already touching code and a small, relevant clarity improvement is safe.",
    "avoid": "Expanding a focused defect fix into a broad rewrite that is difficult to review or validate."
  },
  "d19": {
    "summary": "Ask a direct collaborator for the domain answer instead of navigating through its internal object chain.",
    "python": "class Order:\n    def __init__(self, country): self._country = country\n    def delivery_country(self): return self._country\n\ndef is_international(order):\n    return order.delivery_country() != \"LK\"\n\nassert is_international(Order(\"AU\"))\nprint(\"International delivery\")\n",
    "javascript": "class Order {\n  #country;\n  constructor(country) { this.#country = country; }\n  deliveryCountry() { return this.#country; }\n}\nconst isInternational = order => order.deliveryCountry() !== \"LK\";\nif (!isInternational(new Order(\"AU\"))) throw new Error(\"Wrong destination\");\nconsole.log(\"International delivery\");\n",
    "output": "International delivery",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "Callers reach through several objects and become coupled to their internal layouts.",
    "avoid": "Adding meaningless forwarding methods solely to satisfy a mechanical rule, especially for simple data structures."
  },
  "a0": {
    "summary": "Inventory and orders have clear internal boundaries while running in one process.",
    "python": "class Inventory:\n    def available(self, item): return item == \"book\"\nclass Orders:\n    def __init__(self, inventory): self.inventory = inventory\n    def place(self, item):\n        return \"Accepted\" if self.inventory.available(item) else \"Unavailable\"\n\napp = Orders(Inventory())\nassert app.place(\"book\") == \"Accepted\"\nprint(\"One app; two business modules\")\n",
    "javascript": "class Inventory { available(item) { return item === \"book\"; } }\nclass Orders {\n  constructor(inventory) { this.inventory = inventory; }\n  place(item) { return this.inventory.available(item) ? \"Accepted\" : \"Unavailable\"; }\n}\nconst app = new Orders(new Inventory());\nif (app.place(\"book\") !== \"Accepted\") throw new Error(\"Order failed\");\nconsole.log(\"One app; two business modules\");\n",
    "output": "One app; two business modules",
    "limit": "Boundary sketch in one file. A real modular monolith uses enforced package/module boundaries, ownership and contracts; classes alone do not establish that architecture.",
    "verification": "runnable",
    "use": "One team or a modest product needs clear business boundaries without distributed-system overhead.",
    "avoid": "Independent deployment, isolation or scaling is a proven requirement that cannot be met inside one application."
  },
  "a1": {
    "summary": "The presentation layer calls a service, which uses a data-access layer.",
    "python": "class PriceRepository:\n    def get(self): return 200\nclass QuoteService:\n    def __init__(self, repo): self.repo = repo\n    def total(self, quantity): return self.repo.get() * quantity\n\ndef quote_view(service): return f\"Total: {service.total(3)} cents\"\nassert quote_view(QuoteService(PriceRepository())) == \"Total: 600 cents\"\nprint(quote_view(QuoteService(PriceRepository())))\n",
    "javascript": "class PriceRepository { get() { return 200; } }\nclass QuoteService {\n  constructor(repo) { this.repo = repo; }\n  total(quantity) { return this.repo.get() * quantity; }\n}\nconst quoteView = service => `Total: ${service.total(3)} cents`;\nconst view = quoteView(new QuoteService(new PriceRepository()));\nif (view !== \"Total: 600 cents\") throw new Error(\"Wrong layer result\");\nconsole.log(view);\n",
    "output": "Total: 600 cents",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "A business application benefits from clear presentation, application/domain and data-access responsibilities.",
    "avoid": "Rigid layer hopping adds no value, or domain behaviour becomes anemic while real rules spread across layers."
  },
  "a2": {
    "summary": "The inner business operation knows only its storage port; the outer adapter supplies the implementation.",
    "python": "def create_note(save, text):\n    if not text.strip(): raise ValueError(\"Empty note\")\n    save(text)\n    return \"Saved\"\n\nnotes = []\nassert create_note(notes.append, \"Check design\") == \"Saved\"\nassert notes == [\"Check design\"]\nprint(\"Business rule tested without a database\")\n",
    "javascript": "function createNote(save, text) {\n  if (!text.trim()) throw new Error(\"Empty note\");\n  save(text);\n  return \"Saved\";\n}\nconst notes = [];\ncreateNote(text => notes.push(text), \"Check design\");\nif (notes[0] !== \"Check design\") throw new Error(\"Port not called\");\nconsole.log(\"Business rule tested without a database\");\n",
    "output": "Business rule tested without a database",
    "limit": "A small ports-and-adapters boundary; a full architecture also defines domain/application responsibilities and the direction of dependencies.",
    "verification": "runnable",
    "use": "Important domain rules need independent testing or multiple infrastructure/vendor adapters.",
    "avoid": "The app is a thin, simple CRUD wrapper and extra ports only repeat framework capabilities."
  },
  "a3": {
    "summary": "This is the MVC variant: the model owns state, the controller changes it, and the view formats it.",
    "python": "class Counter:\n    def __init__(self): self.value = 0\n    def increment(self): self.value += 1\n\ndef view(model): return f\"Count: {model.value}\"\ndef controller(model):\n    model.increment()\n    return view(model)\n\nassert controller(Counter()) == \"Count: 1\"\nprint(controller(Counter()))\n",
    "javascript": "class Counter {\n  value = 0;\n  increment() { this.value += 1; }\n}\nconst view = model => `Count: ${model.value}`;\nfunction controller(model) { model.increment(); return view(model); }\nif (controller(new Counter()) !== \"Count: 1\") throw new Error(\"MVC failed\");\nconsole.log(controller(new Counter()));\n",
    "output": "Count: 1",
    "limit": "A local MVC sketch, not MVVM or a complete UI framework. MVVM introduces a view model that exposes presentation state and actions, often through binding.",
    "verification": "runnable",
    "use": "A UI needs a clear separation between state, presentation and interaction logic.",
    "avoid": "Forcing an exact MVC/MVVM shape onto a framework with a different idiomatic state model; follow its architecture coherently."
  },
  "a4": {
    "summary": "A caller depends on a service contract rather than reading another service’s private database.",
    "python": "# A local fake stands in for a remote Inventory API.\nclass InventoryClient:\n    def available(self, item): return {\"available\": item == \"book\"}\n\ndef place_order(client, item):\n    reply = client.available(item)\n    return \"Accepted\" if reply[\"available\"] else \"Unavailable\"\n\nassert place_order(InventoryClient(), \"book\") == \"Accepted\"\nprint(\"Accepted through service contract\")\n",
    "javascript": "// A local fake stands in for a remote Inventory API.\nclass InventoryClient {\n  available(item) { return {available: item === \"book\"}; }\n}\nfunction placeOrder(client, item) {\n  const reply = client.available(item);\n  return reply.available ? \"Accepted\" : \"Unavailable\";\n}\nif (placeOrder(new InventoryClient(), \"book\") !== \"Accepted\") throw new Error(\"Bad reply\");\nconsole.log(\"Accepted through service contract\");\n",
    "output": "Accepted through service contract",
    "limit": "Contract sketch only: these are not independently deployed microservices. Real services need network authentication, timeouts, tracing, versioning, consistency and operational ownership. Availability checking does not reserve stock.",
    "verification": "runnable",
    "use": "Independent team ownership, deployment, isolation or scaling justifies separate operated services.",
    "avoid": "A small team has no operational capacity or measured need; start with a modular monolith."
  },
  "a5": {
    "summary": "The producer publishes a fact; a later consumer reacts without the producer calling its work directly.",
    "python": "from collections import deque\nqueue, notifications = deque(), []\nqueue.append({\"type\": \"OrderCreated\", \"order_id\": \"A\"})\nassert notifications == []\nwhile queue:\n    event = queue.popleft()\n    if event[\"type\"] == \"OrderCreated\":\n        notifications.append(\"Notify \" + event[\"order_id\"])\nassert notifications == [\"Notify A\"]\nprint(\"Notify A\")\n",
    "javascript": "const queue = [], notifications = [];\nqueue.push({type: \"OrderCreated\", orderId: \"A\"});\nif (notifications.length) throw new Error(\"Consumer ran too early\");\nwhile (queue.length) {\n  const event = queue.shift();\n  if (event.type === \"OrderCreated\") notifications.push(`Notify ${event.orderId}`);\n}\nif (notifications.join() !== \"Notify A\") throw new Error(\"Event lost\");\nconsole.log(notifications[0]);\n",
    "output": "Notify A",
    "limit": "In-memory queue only. A production event system needs durability, schema evolution, duplicate handling, ordering policy, retries and monitoring.",
    "verification": "runnable",
    "use": "Several independent consumers react to facts, and asynchronous completion is acceptable.",
    "avoid": "The caller needs an immediate strongly consistent result or nobody can own delivery/replay semantics; synchronous flow may fit."
  },
  "a6": {
    "summary": "A repository exposes a domain-focused query while keeping storage details inside.",
    "python": "class BookingRepository:\n    def __init__(self, rows): self._rows = rows\n    def find_open(self):\n        return [row[\"id\"] for row in self._rows if row[\"status\"] == \"open\"]\n\nrepo = BookingRepository([{\"id\": \"A\", \"status\": \"open\"}, {\"id\": \"B\", \"status\": \"closed\"}])\nassert repo.find_open() == [\"A\"]\nprint(\"Open booking: A\")\n",
    "javascript": "class BookingRepository {\n  constructor(rows) { this.rows = rows; }\n  findOpen() { return this.rows.filter(row => row.status === \"open\").map(row => row.id); }\n}\nconst repo = new BookingRepository([{id: \"A\", status: \"open\"}, {id: \"B\", status: \"closed\"}]);\nif (repo.findOpen().join() !== \"A\") throw new Error(\"Wrong bookings\");\nconsole.log(\"Open booking: A\");\n",
    "output": "Open booking: A",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "Domain-focused storage queries should be kept apart from business rules and storage details.",
    "avoid": "An ORM already provides the useful boundary and a wrapper merely renames every method."
  },
  "a7": {
    "summary": "Two related database writes are rolled back together when the second write violates a constraint.",
    "python": "import sqlite3\nwith sqlite3.connect(\":memory:\") as db:\n    db.execute(\"CREATE TABLE ledger (id INTEGER PRIMARY KEY, cents INTEGER)\")\n    try:\n        with db:\n            db.execute(\"INSERT INTO ledger VALUES (?, ?)\", (1, 500))\n            db.execute(\"INSERT INTO ledger VALUES (?, ?)\", (1, 200))\n    except sqlite3.IntegrityError:\n        pass\n    count = db.execute(\"SELECT COUNT(*) FROM ledger\").fetchone()[0]\n    assert count == 0\nprint(\"Rolled back both writes\")\n",
    "javascript": "// Node.js 24+: built-in SQLite. Save as a .cjs file.\nconst {DatabaseSync} = require(\"node:sqlite\");\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE ledger (id INTEGER PRIMARY KEY, cents INTEGER)\");\ndb.exec(\"BEGIN\");\ntry {\n  const insert = db.prepare(\"INSERT INTO ledger VALUES (?, ?)\");\n  insert.run(1, 500); insert.run(1, 200);\n  db.exec(\"COMMIT\");\n} catch { db.exec(\"ROLLBACK\"); }\nif (db.prepare(\"SELECT COUNT(*) AS n FROM ledger\").get().n !== 0) throw new Error(\"Partial write\");\ndb.close();\nconsole.log(\"Rolled back both writes\");\n",
    "output": "Rolled back both writes",
    "limit": "Real SQLite transaction example. Node.js SQLite is version-dependent and may emit an experimental warning. Database transactions do not atomically roll back external payments or device actions.",
    "verification": "runnable",
    "use": "Related writes within one database must either all commit or all be rolled back.",
    "avoid": "Assuming a local transaction includes a remote bank, email or hardware action; use the applicable coordination protocol."
  },
  "a8": {
    "summary": "Commands change state and queries read it through separate entry points, even with one shared store.",
    "python": "orders = {}\ndef create_order(order_id): orders[order_id] = \"pending\"  # Command\ndef order_status(order_id): return orders[order_id]       # Query\n\ncreate_order(\"A\")\nassert order_status(\"A\") == \"pending\"\nprint(\"A: pending\")\n",
    "javascript": "const orders = new Map();\nconst createOrder = id => orders.set(id, \"pending\"); // Command\nconst orderStatus = id => orders.get(id);            // Query\ncreateOrder(\"A\");\nif (orderStatus(\"A\") !== \"pending\") throw new Error(\"Read model wrong\");\nconsole.log(`A: ${orderStatus(\"A\")}`);\n",
    "output": "A: pending",
    "limit": "A minimal command/query separation sketch. CQRS does not require separate databases or event sourcing; separate read models introduce synchronisation and consistency decisions.",
    "verification": "runnable",
    "use": "Read and write workloads or models have genuinely different needs.",
    "avoid": "A normal CRUD model serves both adequately; duplicated models and synchronisation add unnecessary complexity."
  },
  "a9": {
    "summary": "A later failed step triggers an explicit compensating business action for an earlier step.",
    "python": "reserved = set()\ndef reserve(order_id): reserved.add(order_id)\ndef release(order_id): reserved.discard(order_id)\ndef pay(order_id): raise ConnectionError(\"Payment unavailable\")\n\nreserve(\"A\")\ntry: pay(\"A\")\nexcept ConnectionError: release(\"A\")\nassert \"A\" not in reserved\nprint(\"Reservation compensated\")\n",
    "javascript": "const reserved = new Set();\nconst reserve = id => reserved.add(id);\nconst release = id => reserved.delete(id);\nconst pay = id => { throw new Error(\"Payment unavailable\"); };\nreserve(\"A\");\ntry { pay(\"A\"); } catch { release(\"A\"); }\nif (reserved.has(\"A\")) throw new Error(\"Compensation missing\");\nconsole.log(\"Reservation compensated\");\n",
    "output": "Reservation compensated",
    "limit": "Local saga sketch. Production requires durable workflow state, retryable/idempotent steps and handling compensation failure. A timeout may mean payment status is unknown, so automatic release is not universally correct.",
    "verification": "runnable",
    "use": "A multi-service business workflow cannot use one atomic transaction and meaningful compensation is defined.",
    "avoid": "Compensation is impossible or unacceptable, or a single database transaction suffices; redesign the boundary if necessary."
  },
  "a10": {
    "summary": "Save the business change and its pending event within the same database transaction.",
    "python": "import sqlite3\nwith sqlite3.connect(\":memory:\") as db:\n    db.executescript(\"CREATE TABLE orders (id TEXT PRIMARY KEY); CREATE TABLE outbox (id TEXT PRIMARY KEY, event TEXT);\")\n    with db:\n        db.execute(\"INSERT INTO orders VALUES (?)\", (\"A\",))\n        db.execute(\"INSERT INTO outbox VALUES (?, ?)\", (\"evt-A\", \"OrderCreated:A\"))\n    assert db.execute(\"SELECT COUNT(*) FROM orders\").fetchone()[0] == 1\n    assert db.execute(\"SELECT event FROM outbox\").fetchone()[0] == \"OrderCreated:A\"\nprint(\"Order and pending event saved together\")\n",
    "javascript": "// Node.js 24+: built-in SQLite. Save as a .cjs file.\nconst {DatabaseSync} = require(\"node:sqlite\");\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE orders (id TEXT PRIMARY KEY); CREATE TABLE outbox (id TEXT PRIMARY KEY, event TEXT)\");\ndb.exec(\"BEGIN\");\ntry {\n  db.prepare(\"INSERT INTO orders VALUES (?)\").run(\"A\");\n  db.prepare(\"INSERT INTO outbox VALUES (?, ?)\").run(\"evt-A\", \"OrderCreated:A\");\n  db.exec(\"COMMIT\");\n} catch (error) { db.exec(\"ROLLBACK\"); throw error; }\nif (db.prepare(\"SELECT event FROM outbox\").get().event !== \"OrderCreated:A\") throw new Error(\"Event missing\");\ndb.close();\nconsole.log(\"Order and pending event saved together\");\n",
    "output": "Order and pending event saved together",
    "limit": "This demonstrates the atomic storage step only. A separate publisher must dispatch pending events and track progress; publication may repeat, so consumers need durable deduplication.",
    "verification": "runnable",
    "use": "A database change must reliably lead to event publication despite crashes between those operations.",
    "avoid": "No event-publication boundary exists, or you assume the outbox alone provides exactly-once delivery to every consumer."
  },
  "a11": {
    "summary": "After a failure, the breaker rejects calls during a cooldown, then allows a recovery probe.",
    "python": "class Breaker:\n    def __init__(self): self.retry_at = 0\n    def call(self, now, action):\n        if now < self.retry_at: return \"Blocked\"\n        try:\n            result = action(); self.retry_at = 0; return result\n        except ConnectionError:\n            self.retry_at = now + 10; return \"Failed\"\n\ndef offline(): raise ConnectionError()\nb = Breaker()\nassert b.call(0, offline) == \"Failed\"\nassert b.call(1, lambda: \"OK\") == \"Blocked\"\nassert b.call(10, lambda: \"Recovered\") == \"Recovered\"\nprint(\"Failed → Blocked → Recovered\")\n",
    "javascript": "class Breaker {\n  retryAt = 0;\n  call(now, action) {\n    if (now < this.retryAt) return \"Blocked\";\n    try { const result = action(); this.retryAt = 0; return result; }\n    catch { this.retryAt = now + 10; return \"Failed\"; }\n  }\n}\nconst b = new Breaker();\nif (b.call(0, () => { throw new Error(\"Offline\"); }) !== \"Failed\") throw new Error(\"No trip\");\nif (b.call(1, () => \"OK\") !== \"Blocked\") throw new Error(\"Not blocked\");\nif (b.call(10, () => \"Recovered\") !== \"Recovered\") throw new Error(\"No recovery\");\nconsole.log(\"Failed → Blocked → Recovered\");\n",
    "output": "Failed → Blocked → Recovered",
    "limit": "Synchronous single-caller sketch with an injected clock and one-failure threshold. Real breakers need appropriate error classification, timeouts, thresholds and controlled half-open probes.",
    "verification": "runnable",
    "use": "A failing remote dependency needs bounded calls, protection from repeated load and a controlled recovery attempt.",
    "avoid": "A local deterministic validation error is the issue, or blocking calls would violate an essential recovery protocol."
  },
  "a12": {
    "summary": "Retry only a classified transient failure, with a bounded attempt count and increasing delays.",
    "python": "def retry(action, wait_ms, jitter_ms):\n    for attempt in range(3):\n        try: return action()\n        except TimeoutError:\n            if attempt == 2: raise\n            wait_ms(100 * 2 ** attempt + jitter_ms())\n\ncalls, delays = [], []\ndef flaky():\n    calls.append(1)\n    if len(calls) < 3: raise TimeoutError()\n    return \"OK\"\nassert retry(flaky, delays.append, lambda: 7) == \"OK\"\nassert delays == [107, 207]\nprint(\"Retry delays: 107, 207 ms\")\n",
    "javascript": "class TransientTimeout extends Error {}\nfunction retry(action, waitMs, jitterMs) {\n  for (let attempt = 0; attempt < 3; attempt++) {\n    try { return action(); }\n    catch (error) {\n      if (!(error instanceof TransientTimeout) || attempt === 2) throw error;\n      waitMs(100 * 2 ** attempt + jitterMs());\n    }\n  }\n}\nlet calls = 0; const delays = [];\nconst flaky = () => { if (++calls < 3) throw new TransientTimeout(); return \"OK\"; };\nif (retry(flaky, ms => delays.push(ms), () => 7) !== \"OK\") throw new Error(\"No result\");\nif (delays.join() !== \"107,207\") throw new Error(\"Bad backoff\");\nconsole.log(\"Retry delays: 107, 207 ms\");\n",
    "output": "Retry delays: 107, 207 ms",
    "limit": "The injected waiter records delays instead of sleeping; jitter is fixed for deterministic demonstration. Real code uses a clock-appropriate delay, random jitter, cancellation, an overall deadline and idempotent effects.",
    "verification": "runnable",
    "use": "Failures are transient, the operation is retry-safe and a bounded time/attempt budget exists.",
    "avoid": "The error is permanent, a timeout leaves an unsafe uncertain effect, or retries would amplify an outage."
  },
  "a13": {
    "summary": "Read the cache first, loading and storing the value only on a miss.",
    "python": "cache, loads = {}, []\ndef load(key): loads.append(key); return \"Guide\"\ndef get_title(key):\n    if key not in cache: cache[key] = load(key)\n    return cache[key]\n\nassert get_title(\"A\") == get_title(\"A\") == \"Guide\"\nassert loads == [\"A\"]\nprint(\"Two reads; one load\")\n",
    "javascript": "const cache = new Map(), loads = [];\nconst load = key => { loads.push(key); return \"Guide\"; };\nfunction getTitle(key) {\n  if (!cache.has(key)) cache.set(key, load(key));\n  return cache.get(key);\n}\ngetTitle(\"A\"); getTitle(\"A\");\nif (loads.length !== 1) throw new Error(\"Cache missed twice\");\nconsole.log(\"Two reads; one load\");\n",
    "output": "Two reads; one load",
    "limit": "Local cache only, without expiry, invalidation, size limits or concurrent-load suppression. Define freshness and authorisation behaviour before using a production cache.",
    "verification": "runnable",
    "use": "Repeated expensive reads tolerate a defined freshness window and invalidation can be managed.",
    "avoid": "Freshness or permissions cannot tolerate stale results, or cache complexity exceeds the measured benefit."
  },
  "t0": {
    "summary": "A unit test checks a small rule against a separately stated expected answer.",
    "python": "def shipping_cents(subtotal_cents):\n    return 0 if subtotal_cents >= 5000 else 500\n\n# Expectations come from the stated business rule.\nassert shipping_cents(4999) == 500\nassert shipping_cents(5000) == 0\nprint(\"2 unit checks passed\")\n",
    "javascript": "const assert = require(\"node:assert/strict\");\nconst shippingCents = subtotalCents => subtotalCents >= 5000 ? 0 : 500;\nassert.equal(shippingCents(4999), 500);\nassert.equal(shippingCents(5000), 0);\nconsole.log(\"2 unit checks passed\");\n",
    "output": "2 unit checks passed",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "A small deterministic rule can be checked quickly against independent expected results.",
    "avoid": "Trying to prove real database, network or complete-user-journey behaviour using only mocks and isolated units."
  },
  "t1": {
    "summary": "Exercise a real database constraint rather than mocking database responses.",
    "python": "import sqlite3\nwith sqlite3.connect(\":memory:\") as db:\n    db.execute(\"CREATE TABLE users (email TEXT UNIQUE)\")\n    db.execute(\"INSERT INTO users VALUES (?)\", (\"a@example.test\",))\n    rejected = False\n    try: db.execute(\"INSERT INTO users VALUES (?)\", (\"a@example.test\",))\n    except sqlite3.IntegrityError: rejected = True\n    assert rejected\nprint(\"Database rejects duplicate email\")\n",
    "javascript": "// Node.js 24+: save as .cjs.\nconst {DatabaseSync} = require(\"node:sqlite\");\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE users (email TEXT UNIQUE)\");\nconst insert = db.prepare(\"INSERT INTO users VALUES (?)\");\ninsert.run(\"a@example.test\");\nlet rejected = false;\ntry { insert.run(\"a@example.test\"); } catch { rejected = true; }\nif (!rejected) throw new Error(\"Constraint absent\");\ndb.close();\nconsole.log(\"Database rejects duplicate email\");\n",
    "output": "Database rejects duplicate email",
    "limit": "A real SQLite integration check. Also test the database engine and configuration actually used in production, plus migrations and isolation behaviour.",
    "verification": "runnable",
    "use": "Your risk lies at a real boundary: database constraints, migrations, adapters or cooperating components.",
    "avoid": "Using integration tests for every trivial calculation when a unit test is faster and gives a clearer failure."
  },
  "t2": {
    "summary": "A small contract check verifies required fields, their types and allowed values.",
    "python": "def matches_contract(reply):\n    return (isinstance(reply, dict)\n            and type(reply.get(\"id\")) is str\n            and reply.get(\"status\") in {\"pending\", \"paid\"})\n\nassert matches_contract({\"id\": \"A\", \"status\": \"pending\"})\nassert not matches_contract({\"id\": 1, \"status\": \"unknown\"})\nprint(\"Valid reply accepted; invalid reply rejected\")\n",
    "javascript": "const matchesContract = reply => reply !== null && typeof reply === \"object\"\n  && typeof reply.id === \"string\" && [\"pending\", \"paid\"].includes(reply.status);\nif (!matchesContract({id: \"A\", status: \"pending\"})) throw new Error(\"Valid rejected\");\nif (matchesContract({id: 1, status: \"unknown\"})) throw new Error(\"Invalid accepted\");\nconsole.log(\"Valid reply accepted; invalid reply rejected\");\n",
    "output": "Valid reply accepted; invalid reply rejected",
    "limit": "This hand-written schema check illustrates the method; full consumer/provider contract testing needs agreed schemas, actual implementations and compatibility checks.",
    "verification": "runnable",
    "use": "Independently changing producers and consumers must remain compatible.",
    "avoid": "Expecting schema compatibility alone to prove correct pricing, authorisation or the whole user experience."
  },
  "t3": {
    "summary": "Use a real browser to follow the guide’s design-search journey from start to result.",
    "python": "# Setup: pip install playwright; playwright install chromium\n# Serve this repository locally: python -m http.server 8000\nfrom playwright.sync_api import sync_playwright, expect\nwith sync_playwright() as p:\n    browser = p.chromium.launch()\n    page = browser.new_page()\n    page.goto(\"http://localhost:8000\")\n    page.get_by_role(\"link\", name=\"01 Software design\", exact=True).click()\n    page.get_by_role(\"textbox\", name=\"Filter concepts\", exact=True).fill(\"Strategy\")\n    expect(page.get_by_role(\"heading\", name=\"Strategy\", exact=True)).to_be_visible()\n    browser.close()\nprint(\"Design search journey passed\")\n",
    "javascript": "// Setup: npm install --save-dev playwright; npx playwright install chromium\n// Serve this repository at http://localhost:8000. Save as .cjs.\nconst {chromium} = require(\"playwright\");\n(async () => {\n  const browser = await chromium.launch();\n  try {\n    const page = await browser.newPage();\n    await page.goto(\"http://localhost:8000\");\n    await page.getByRole(\"link\", {name: \"01 Software design\", exact: true}).click();\n    await page.getByRole(\"textbox\", {name: \"Filter concepts\", exact: true}).fill(\"Strategy\");\n    await page.getByRole(\"heading\", {name: \"Strategy\", exact: true}).waitFor({state: \"visible\"});\n    console.log(\"Design search journey passed\");\n  } finally { await browser.close(); }\n})().catch(error => { console.error(error); process.exitCode = 1; });\n",
    "output": "Design search journey passed",
    "limit": "Local Playwright template. Requires the stated dependency, browser and running guide. The snippets are syntax-checked here but not executed with Playwright; the live guide is checked separately through the connected browser.",
    "verification": "template",
    "use": "A critical user outcome needs proof through the browser and connected application.",
    "avoid": "Covering every input permutation through slow, brittle UI scripts; keep most rule checks at lower levels."
  },
  "t4": {
    "summary": "Check an invariant across a grid of generated valid inputs, instead of only one expected example.",
    "python": "def transfer(a, b, amount): return a - amount, b + amount\nchecks = 0\nfor a in range(1, 21):\n    for amount in range(a + 1):\n        x, y = transfer(a, 7, amount)\n        assert x >= 0\n        assert x + y == a + 7\n        checks += 1\nassert checks == 230\nprint(\"230 invariant checks passed\")\n",
    "javascript": "const transfer = (a, b, amount) => [a - amount, b + amount];\nlet checks = 0;\nfor (let a = 1; a <= 20; a++) {\n  for (let amount = 0; amount <= a; amount++) {\n    const [x, y] = transfer(a, 7, amount);\n    if (x < 0 || x + y !== a + 7) throw new Error(\"Invariant broken\");\n    checks++;\n  }\n}\nif (checks !== 230) throw new Error(\"Missing cases\");\nconsole.log(\"230 invariant checks passed\");\n",
    "output": "230 invariant checks passed",
    "limit": "A bounded generated-input invariant test. Hypothesis or fast-check can add richer generation and shrinking; this finite grid does not establish the property for every possible input.",
    "verification": "runnable",
    "use": "You can state meaningful invariants over many inputs and independent expected examples are insufficient alone.",
    "avoid": "Generating random inputs without a trustworthy property, or claiming a bounded sample is a proof over all inputs."
  },
  "t5": {
    "summary": "A decision table makes below, at and above a boundary explicit.",
    "python": "def allowed(age, verified): return age >= 18 and verified\ncases = [(17, True, False), (18, True, True),\n         (19, True, True), (18, False, False)]\nfor age, verified, expected in cases:\n    assert allowed(age, verified) is expected\nprint(\"4 decision cases passed\")\n",
    "javascript": "const allowed = (age, verified) => age >= 18 && verified;\nconst cases = [[17, true, false], [18, true, true],\n               [19, true, true], [18, false, false]];\nfor (const [age, verified, expected] of cases) {\n  if (allowed(age, verified) !== expected) throw new Error(\"Decision mismatch\");\n}\nconsole.log(\"4 decision cases passed\");\n",
    "output": "4 decision cases passed",
    "limit": "Small teaching example; add project-specific validation, error handling and tests before reuse.",
    "verification": "runnable",
    "use": "Thresholds, combinations and role/action/resource rules create easily missed edge cases.",
    "avoid": "Treating the decision table as complete without inspecting missing conditions, invalid types or requirements."
  },
  "t6": {
    "summary": "A negative authorisation test checks that an editor cannot cross a tenant boundary.",
    "python": "def can_read(user, record):\n    return user[\"role\"] == \"editor\" and user[\"tenant\"] == record[\"tenant\"]\n\nuser = {\"role\": \"editor\", \"tenant\": \"A\"}\nassert can_read(user, {\"tenant\": \"A\"})\nassert not can_read(user, {\"tenant\": \"B\"})\nprint(\"Cross-tenant request rejected\")\n",
    "javascript": "const canRead = (user, record) =>\n  user.role === \"editor\" && user.tenant === record.tenant;\nconst user = {role: \"editor\", tenant: \"A\"};\nif (!canRead(user, {tenant: \"A\"})) throw new Error(\"Same tenant denied\");\nif (canRead(user, {tenant: \"B\"})) throw new Error(\"Cross-tenant leak\");\nconsole.log(\"Cross-tenant request rejected\");\n",
    "output": "Cross-tenant request rejected",
    "limit": "Policy-level negative test only. Test the actual protected endpoint with independent users too; it does not replace SAST, dependency scans, DAST or a penetration test.",
    "verification": "runnable",
    "use": "Untrusted users or data can cross security boundaries, and before releasing security-sensitive changes.",
    "avoid": "Using one clean scan or negative unit test as a complete security assessment; methods need to cover the actual attack surface."
  },
  "t7": {
    "summary": "Measure a bounded workload using a monotonic clock; elapsed time is an observation, not a universal performance target.",
    "python": "from time import perf_counter\n\ndef calculation(): return sum(range(100))\nstart = perf_counter()\nfor _ in range(10000): result = calculation()\nelapsed_ms = (perf_counter() - start) * 1000\nassert result == 4950\nprint(f\"Measured {elapsed_ms:.2f} ms\")\n",
    "javascript": "const {performance} = require(\"node:perf_hooks\");\nconst calculation = () => { let n = 0; for (let i = 0; i < 100; i++) n += i; return n; };\nconst start = performance.now();\nlet result;\nfor (let i = 0; i < 10000; i++) result = calculation();\nconst elapsedMs = performance.now() - start;\nif (result !== 4950) throw new Error(\"Wrong calculation\");\nconsole.log(`Measured ${elapsedMs.toFixed(2)} ms`);\n",
    "output": "Measured … ms (varies by machine)",
    "limit": "Microbenchmark only; Python and JavaScript workloads are not a fair language benchmark. Real performance/resilience testing needs representative concurrency, latency percentiles, resource metrics and controlled failure/recovery scenarios.",
    "verification": "runnable",
    "outputPattern": "Measured \\d+\\.\\d{2} ms",
    "use": "You have a representative workload, measurable targets and a safe environment for load or fault injection.",
    "avoid": "Running unapproved stress or fault tests on production, or extrapolating a tiny microbenchmark into a capacity claim."
  },
  "t8": {
    "summary": "A browser test checks a named control, modal focus and keyboard dismissal as part of accessibility testing.",
    "python": "# Setup: pip install playwright; playwright install chromium\n# Serve this guide at http://localhost:8000.\nfrom playwright.sync_api import sync_playwright, expect\nwith sync_playwright() as p:\n    browser = p.chromium.launch()\n    page = browser.new_page()\n    page.goto(\"http://localhost:8000\")\n    page.get_by_role(\"button\", name=\"Search the field guide\", exact=False).click()\n    expect(page.get_by_role(\"dialog\", name=\"Find a concept\")).to_be_visible()\n    expect(page.get_by_placeholder(\"Try Strategy, security, ATM, Python…\")).to_be_focused()\n    page.keyboard.press(\"Escape\")\n    expect(page.get_by_role(\"dialog\", name=\"Find a concept\")).not_to_be_visible()\n    browser.close()\nprint(\"Search dialog keyboard checks passed\")\n",
    "javascript": "// Setup: npm install --save-dev @playwright/test; npx playwright install chromium\n// Serve this guide at http://localhost:8000. Save as .cjs.\nconst {chromium, expect} = require(\"@playwright/test\");\n(async () => {\n  const browser = await chromium.launch();\n  try {\n    const page = await browser.newPage();\n    await page.goto(\"http://localhost:8000\");\n    await page.getByRole(\"button\", {name: \"Search the field guide\", exact: false}).click();\n    const dialog = page.getByRole(\"dialog\", {name: \"Find a concept\"});\n    await expect(dialog).toBeVisible();\n    await expect(page.getByPlaceholder(\"Try Strategy, security, ATM, Python…\")).toBeFocused();\n    await page.keyboard.press(\"Escape\"); await expect(dialog).not.toBeVisible();\n    console.log(\"Search dialog keyboard checks passed\");\n  } finally { await browser.close(); }\n})().catch(error => { console.error(error); process.exitCode = 1; });\n",
    "output": "Search dialog keyboard checks passed",
    "limit": "Local template, syntax-checked but not executed with Playwright here. These few checks do not establish WCAG conformance. Add keyboard-only journeys, zoom, contrast, screen-reader testing and an appropriate automated accessibility audit.",
    "verification": "template",
    "use": "Users must operate controls with keyboards, assistive technology, zoom and differing perceptual needs.",
    "avoid": "Treating a few automated checks as WCAG conformance; manual and assistive-technology evaluation remain necessary."
  },
  "t9": {
    "summary": "Turn one user acceptance example into a reproducible check, then use human exploration for cases the script does not cover.",
    "python": "def cancel_order(status):\n    if status != \"pending\": raise ValueError(\"Cannot cancel\")\n    return \"cancelled\"\n\n# Given pending, when cancelled, then status is cancelled.\nassert cancel_order(\"pending\") == \"cancelled\"\n# A domain user should also explore confusing sequences and messages.\nprint(\"Pending-order acceptance example passed\")\n",
    "javascript": "function cancelOrder(status) {\n  if (status !== \"pending\") throw new Error(\"Cannot cancel\");\n  return \"cancelled\";\n}\n// Given pending, when cancelled, then status is cancelled.\nif (cancelOrder(\"pending\") !== \"cancelled\") throw new Error(\"Acceptance failed\");\n// Human exploration still checks unexpected sequences and usability.\nconsole.log(\"Pending-order acceptance example passed\");\n",
    "output": "Pending-order acceptance example passed",
    "limit": "Code automates an acceptance example, not exploratory judgment or user acceptance of the whole product. Record human session findings separately.",
    "verification": "runnable",
    "use": "You need domain/user judgment, unexpected-use exploration and validation of the intended outcome.",
    "avoid": "Using user acceptance to replace security, performance or technical verification, or automating away all human exploration."
  },
  "t10": {
    "summary": "A regression example detects an intentionally introduced boundary mistake—the basic idea behind mutation testing.",
    "python": "def correct(age): return age >= 18\ndef mutant(age): return age > 18  # Intentional wrong boundary.\n\ndef passes_suite(rule):\n    return all(rule(age) == expected for age, expected in [(17, False), (18, True)])\n\nassert passes_suite(correct)\nassert not passes_suite(mutant)\nprint(\"Regression catches boundary mutant\")\n",
    "javascript": "const correct = age => age >= 18;\nconst mutant = age => age > 18; // Intentional wrong boundary.\nconst passesSuite = rule => [[17, false], [18, true]]\n  .every(([age, expected]) => rule(age) === expected);\nif (!passesSuite(correct)) throw new Error(\"Correct rule failed\");\nif (passesSuite(mutant)) throw new Error(\"Mutant survived\");\nconsole.log(\"Regression catches boundary mutant\");\n",
    "output": "Regression catches boundary mutant",
    "limit": "A manually introduced mutant, not an automated mutation-testing tool. Use a tool to explore a broader set of controlled implementation changes.",
    "verification": "runnable",
    "use": "Past defects must stay fixed and you want to know whether tests detect controlled mistakes.",
    "avoid": "Optimising coverage or mutation percentages while ignoring weak assertions, missing requirements and real operational risk."
  },
  "t11": {
    "summary": "AI may suggest test cases, but expectations must be reviewed against a separately stated rule before they become checks.",
    "python": "# Requirement: free delivery at or above 5000 cents.\n# Candidate cases have been checked against that requirement.\ncases = [(4999, 500), (5000, 0), (5001, 0)]\ndef shipping_cents(subtotal): return 0 if subtotal >= 5000 else 500\n\nfor subtotal, reviewed_expected in cases:\n    assert shipping_cents(subtotal) == reviewed_expected\nprint(\"3 reviewed cases passed\")\n",
    "javascript": "// Requirement: free delivery at or above 5000 cents.\n// Review AI-proposed expectations before using them as test oracles.\nconst cases = [[4999, 500], [5000, 0], [5001, 0]];\nconst shippingCents = subtotal => subtotal >= 5000 ? 0 : 500;\nfor (const [subtotal, reviewedExpected] of cases) {\n  if (shippingCents(subtotal) !== reviewedExpected) throw new Error(\"Mismatch\");\n}\nconsole.log(\"3 reviewed cases passed\");\n",
    "output": "3 reviewed cases passed",
    "limit": "No AI service is called by this snippet. It shows how reviewed candidate cases become reproducible checks; another AI reviewer is not independent assurance.",
    "verification": "runnable",
    "use": "AI can suggest missing cases, explore flows or triage evidence that people can reproduce and review.",
    "avoid": "Letting AI invent its own unreviewed expected answers, hide failed cases or sign off its own work as independent assurance."
  }
};

sources.push(
['Examples','Python sqlite3 documentation','https://docs.python.org/3.12/library/sqlite3.html','Transactions and database constraint checks in Python.'],
['Examples','Node.js 24 SQLite documentation','https://nodejs.org/docs/latest-v24.x/api/sqlite.html','The Node.js built-in database API used by selected examples.'],
['Examples','Playwright Python documentation','https://playwright.dev/python/docs/intro','Setup required for the optional local browser-test templates.'],
['Examples','Playwright JavaScript library','https://playwright.dev/docs/library','Browser automation library used by the optional local templates.']
);
