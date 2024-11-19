# Documentation Update Checklist

## Before Making Changes
- [ ] Review existing documentation
- [ ] Check related feature documentation
- [ ] Review current CHANGELOG.md
- [ ] Identify affected components and files

## During Implementation
### Code Changes
- [ ] Add/update code comments
- [ ] Update TypeScript types/interfaces
- [ ] Document new dependencies
- [ ] Document environment variables
- [ ] Add error handling documentation

### Feature Documentation
- [ ] Create/update feature documentation using template
- [ ] Document API changes
- [ ] Update configuration instructions
- [ ] Document security considerations
- [ ] Add performance notes
- [ ] Include testing instructions

## After Implementation
### Update CHANGELOG.md
- [ ] Add version number (if applicable)
- [ ] Document under correct section:
  - Added (new features)
  - Changed (changes in existing functionality)
  - Deprecated (soon-to-be removed features)
  - Removed (removed features)
  - Fixed (bug fixes)
  - Security (security improvements)

### Update Related Documentation
- [ ] Update README.md if needed
- [ ] Update API documentation
- [ ] Update security documentation
- [ ] Update deployment guides
- [ ] Update environment setup guides

### Testing Documentation
- [ ] Document test cases
- [ ] Update testing instructions
- [ ] Document any known issues
- [ ] Add troubleshooting guides

### Review
- [ ] Review all documentation for accuracy
- [ ] Check for broken links
- [ ] Verify code examples
- [ ] Test documentation steps
- [ ] Get peer review if possible

## Documentation Locations

### Main Documentation Files
- `README.md` - Project overview and setup
- `CHANGELOG.md` - Version history and changes
- `ROADMAP.md` - Future development plans
- `DOCUMENTATION_CHECKLIST.md` - This checklist

### Feature Documentation
- Location: `/docs/features/`
- Use feature template
- Include all technical details
- Document dependencies

### API Documentation
- Location: `/docs/api/`
- Document all endpoints
- Include request/response examples
- List error codes

### Security Documentation
- Location: `/docs/security/`
- Document security measures
- List access controls
- Include security best practices

### Deployment Documentation
- Location: `/docs/deployment/`
- Update environment requirements
- Document deployment steps
- Include rollback procedures

## Best Practices
1. Keep documentation up to date
2. Be clear and concise
3. Include code examples
4. Document edge cases
5. Add troubleshooting tips
6. Use consistent formatting
7. Include version information
8. Reference related documentation

## Notes
- Documentation should be treated as part of the feature
- Update documentation before marking feature as complete
- Always test documentation steps
- Keep documentation simple and easy to understand
- Use markdown formatting for consistency
- Include screenshots or diagrams when helpful
