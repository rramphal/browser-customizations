(function () {
	const output = [];

	const courseName = document.title.replace(' | Udemy', '');
	output.push(courseName);

	// open all sections
	Array.from(document.querySelectorAll("[class^='section--section-chevron'].udi-angle-down")).forEach((chevron) => chevron.click());

	const sections = Array.from(document.querySelectorAll("div[class^='section--section--']"));
	sections.forEach((section) => { 
		const title = section.querySelector("[class^='section--title'] > span > span > span").innerText;
		output.push('  ' + title);

		const list  = section.querySelector("[class^='section--section-list']");
		const lessonTitles = Array.from(list.querySelectorAll("[class^='curriculum-item-link--title'] > span > span > span")).map((title) => '    ' + title.innerText);
		output.push(...lessonTitles);		
	});

	console.log(output.join('\n'));
})();
