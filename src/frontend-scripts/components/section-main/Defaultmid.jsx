import React from 'react'; // eslint-disable-line
import { connect } from 'react-redux';
import { viewPatchNotes } from '../../actions/actions';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';

const mapStateToProps = ({ version, userInfo }) => ({ version, userInfo });

const mapDispatchToProps = dispatch => ({
	readPatchNotes: () => {
		dispatch(viewPatchNotes());
		fetch('/viewPatchNotes', {
			credentials: 'same-origin'
		});
		window.location.hash = '#/changelog';
	}
});

const PatchAlert = ({ isActive, onClick }) => (isActive ? <div className="patch-alert" onClick={onClick} /> : null);

PatchAlert.propTypes = {
	isActive: PropTypes.bool,
	onClick: PropTypes.func
};

const Defaultmid = ({ version, readPatchNotes, quickDefault, userInfo }) => (
	<section className="defaultmid">
		<div className="poll">
			<a target="_blank" href="/polls">
				New poll, upcoming extended game play ideas (seasonal mode, tournament mode), please vote!
			</a>
		</div>
		<PatchAlert isActive={version.lastSeen && version.current.number !== version.lastSeen} onClick={readPatchNotes} />
		<img src="/images/lizard29.png" alt="Secret Hitler log" width="400" height="400" />
		<p>
			<span>{`sh.io version ${version.current.number} "${version.current.color}" released ${version.current.date} | `}</span>
			<span>
				<a onClick={readPatchNotes}> changelog </a>|{' '}
				<a rel="noopener noreferrer" target="_blank" href="https://github.com/cozuya/secret-hitler/issues">
					open issues and upcoming features
				</a>{' '}
				|{' '}
				<a rel="noopener noreferrer" target="_blank" style={{ color: 'lightgreen' }} href="https://github.com/cozuya/secret-hitler/wiki">
					wiki page
				</a>{' '}
				|{' '}
				<a rel="noopener noreferrer" target="_blank" style={{ fontWeight: 'bold', color: '#fff' }} href="https://discord.gg/FXDxP2m">
					discord server
				</a>
			</span>
		</p>
	</section>
);

Defaultmid.propTypes = {
	quickDefault: PropTypes.func,
	version: PropTypes.object,
	readPatchNotes: PropTypes.func,
	userInfo: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(Defaultmid);
